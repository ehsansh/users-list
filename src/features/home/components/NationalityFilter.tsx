import React, { useState, useEffect, useRef } from 'react';
import styles from './NationalityFilter.module.scss';
import { countryList } from '@/data/countries';
import Image from 'next/image';

interface NationalityFilterProps {
    currentNationality: string;
    onNationalityChange: (nationality: string) => void;
    hasUsers: boolean;
}

const NationalityFilter = ({
    currentNationality,
    onNationalityChange,
    hasUsers
}: NationalityFilterProps) => {
    const [inputValue, setInputValue] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const getCountryName = (code: string) => {
        if (!code) return '';
        const country = countryList.find((c) => c.code === code);
        return country ? country.name : '';
    };

    useEffect(() => {
        setInputValue(getCountryName(currentNationality));
    }, [currentNationality]);

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

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        if (!showDropdown) {
            setShowDropdown(true);
        }
        if (event.target.value === '') {
            onNationalityChange('');
        }
    };

    const handleInputFocus = () => {
        setShowDropdown(true);
    };

    const handleCountrySelect = (countryCode: string) => {
        onNationalityChange(countryCode);
        setInputValue(getCountryName(countryCode));
        setShowDropdown(false);
    };

    const clearFilter = () => {
        onNationalityChange('');
        setInputValue('');
        setShowDropdown(false);
    };

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
                    disabled={!hasUsers}
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
