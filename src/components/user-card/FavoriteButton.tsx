import React from 'react';
import styles from './FavoriteButton.module.scss';
const FavoriteButton = () => {
    return (
        <button className={`${styles.favoriteButton}`}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                width="24px"
                height="24px"
            >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
            </svg>
        </button>
    );
};

export default FavoriteButton;
