import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types/user.types';

const FAVORITES_KEY = 'favoriteUsers';

const getFavoriteUsers = (): User[] => {
    try {
        const favorites = localStorage.getItem(FAVORITES_KEY);
        if (!favorites) {
            return [];
        }
        const parsed = JSON.parse(favorites);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error('Error reading favorites from localStorage', error);
        return [];
    }
};

const setFavoriteUsers = (users: User[]) => {
    try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(users));
    } catch (error) {
        console.error('Error writing favorites to localStorage', error);
    }
};

export const useFavorite = (user: Partial<User> | null) => {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (!user?.email) return;
        const favorites = getFavoriteUsers();
        const isUserFavorite = favorites.some(
            (favUser) => favUser.email === user.email
        );
        setIsFavorite(isUserFavorite);
    }, [user]);

    const toggleFavorite = useCallback(() => {
        if (!user || !user.email) return;

        const favorites = getFavoriteUsers();
        const userIndex = favorites.findIndex(
            (favUser) => favUser.email === user.email
        );

        let newFavorites: User[];

        if (userIndex > -1) {
            // Remove from favorites
            newFavorites = [
                ...favorites.slice(0, userIndex),
                ...favorites.slice(userIndex + 1)
            ];
            setIsFavorite(false);
        } else {
            // Add to favorites, ensuring we have a complete User object if possible
            newFavorites = [...favorites, user as User];
            setIsFavorite(true);
        }

        setFavoriteUsers(newFavorites);
    }, [user]);

    return { isFavorite, toggleFavorite };
}; 