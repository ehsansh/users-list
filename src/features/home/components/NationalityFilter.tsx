/*
  TODO: Accessibility Improvements for this custom combobox.

  This custom select component currently has accessibility limitations:
  1. It is not fully keyboard-operable (arrow keys, Enter to select).
  2. It does not correctly communicate its state (expanded, selected option) to screen readers.

  To fix this, two paths can be taken:
    - Use a native <select> element, which provides full accessibility out-of-the-box but we can not add flags to it.
    - Re-implement this component following the WAI-ARIA Combobox pattern. 
*/

import React, { useState, useEffect, useRef } from 'react';
import styles from './NationalityFilter.module.scss';
import { countryList } from '@/data/countries';
import Image from 'next/image';

interface NationalityFilterProps {
    currentNationality: string;
    setNationality: (nationality: string) => void;
    disabled: boolean;
}

/**
 * Custom nationality filter component with searchable dropdown and country flags
 * Features:
 * - Searchable input field
 * - Dropdown with country flags
 * - Clear filter button
 * - Click outside to close
 */
const NationalityFilter = ({
    currentNationality,
    setNationality,
    disabled
}: NationalityFilterProps) => {
    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    /**
     * Converts country code to full country name
     * @param code Two-letter country code
     * @returns Full country name or empty string if not found
     */
    const getCountryName = (code: string) => {
        if (!code) return '';
        const country = countryList.find((c) => c.code === code);
        return country ? country.name : '';
    };

    // Update input value when nationality filter changes
    useEffect(() => {
        setInputValue(getCountryName(currentNationality));
    }, [currentNationality]);

    // Handle clicks outside the component to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                wrapperRef.current &&
                !wrapperRef.current.contains(event.target as Node)
            ) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [wrapperRef]);

    /**
     * Handles input changes:
     * - Updates input value
     * - Shows dropdown if hidden
     * - Clears filter if input is empty
     */
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        if (!showDropdown) {
            setShowDropdown(true);
        }
        if (event.target.value === '') {
            setNationality('');
        }
    };

    const handleInputFocus = () => {
        setShowDropdown(true);
    };

    /**
     * Handles country selection:
     * - Updates nationality filter
     * - Updates input value with country name
     * - Closes dropdown
     */
    const handleCountrySelect = (countryCode: string) => {
        setNationality(countryCode);
        setInputValue(getCountryName(countryCode));
        setShowDropdown(false);
    };

    /**
     * Clears the nationality filter:
     * - Resets input value
     * - Clears nationality filter
     * - Closes dropdown
     */
    const clearFilter = () => {
        setNationality('');
        setInputValue('');
        setShowDropdown(false);
    };

    // Filter countries based on input value
    const filteredCountries = countryList.filter((country) =>
        country.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div className={styles.filterContainer} ref={wrapperRef}>
            <label htmlFor="nationality-filter" className={styles.filterLabel}>
                Filter by Nationality:
            </label>
            <div className={styles.filterInputContainer}>
                <input
                    type="text"
                    id="nationality-filter"
                    value={inputValue}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    placeholder="Search or select a country"
                    className={styles.filterInput}
                    autoComplete="off"
                    disabled={disabled}
                />
                {currentNationality && (
                    <button
                        onClick={clearFilter}
                        className={styles.clearButton}
                        title="Clear filter"
                    >
                        &times;
                    </button>
                )}
            </div>
            {showDropdown && (
                <div className={styles.dropdown}>
                    {filteredCountries.length > 0 ? (
                        filteredCountries.map((country) => (
                            <div
                                key={country.code}
                                className={styles.dropdownItem}
                                onClick={() =>
                                    handleCountrySelect(country.code)
                                }
                            >
                                <Image
                                    src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                                    alt={`${country.name} flag`}
                                    width={20}
                                    height={15}
                                />
                                <span>{country.name}</span>
                            </div>
                        ))
                    ) : (
                        <div className={styles.dropdownItem}>
                            No countries found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default NationalityFilter;
