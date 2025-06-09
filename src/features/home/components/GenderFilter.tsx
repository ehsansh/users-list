import React from 'react';
import styles from './GenderFilter.module.scss';

interface GenderFilterProps {
    currentGender: string;
    setGender: (gender: string) => void;
    disabled?: boolean;
}

const GenderFilter = ({
    currentGender,
    setGender,
    disabled
}: GenderFilterProps) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setGender(event.target.value);
    };

    return (
        <div className={styles.filterContainer}>
            <label htmlFor="gender-filter" className={styles.filterLabel}>
                Filter by Gender:
            </label>
            <select
                id="gender-filter"
                value={currentGender}
                onChange={handleChange}
                className={styles.filterSelect}
                disabled={disabled}
            >
                <option value="">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>
        </div>
    );
};

export default GenderFilter;
