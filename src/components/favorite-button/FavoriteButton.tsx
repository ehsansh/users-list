import React from 'react';
import styles from './FavoriteButton.module.scss';
import clsx from 'clsx';
import { useFavorite } from '@/components/favorite-button/useFavorite';
import { User } from '@/types/user.types';

interface FavoriteButtonProps {
    size?: 'small' | 'large';
    user: Partial<User>;
}

const FavoriteButton = ({ size = 'small', user }: FavoriteButtonProps) => {
    const { isFavorite, toggleFavorite } = useFavorite(user);

    return (
        <button
            className={clsx(
                styles.favoriteButton,
                styles[size],
                isFavorite && styles.isFavorite
            )}
            onClick={toggleFavorite}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            aria-pressed={isFavorite}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
            >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
            </svg>
        </button>
    );
};

export default FavoriteButton;
