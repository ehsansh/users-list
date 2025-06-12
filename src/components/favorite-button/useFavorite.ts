import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types/user.types';

const FAVORITES_KEY = 'favoriteUsers';
const FAVORITES_CHANGED_EVENT = 'favoritesChanged';

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



const persistFavoriteUsers = (users: User[]) => {
    try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(users));
    } catch (error) {
        console.error('Error writing favorites to localStorage', error);
    }
};

export const useFavorite = (user: Partial<User> | null) => {
    const [favoriteUsers, setFavoriteUsers] = useState<User[]>([]);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const handleFavoritesChange = () => {
            setFavoriteUsers(getFavoriteUsers());
        };

        handleFavoritesChange();

        window.addEventListener(FAVORITES_CHANGED_EVENT, handleFavoritesChange);
        return () => {
            window.removeEventListener(FAVORITES_CHANGED_EVENT, handleFavoritesChange);
        };
    }, []);

    useEffect(() => {
        const isUserFavorite =
            !!user?.email &&
            favoriteUsers.some((favUser) => favUser.email === user.email);
        setIsFavorite(isUserFavorite);
    }, [user, favoriteUsers]);

    const toggleFavorite = useCallback(() => {
        if (!user || !user.email) return;

        const currentFavorites = getFavoriteUsers();

        const userIndex = currentFavorites.findIndex(
            (favUser) => favUser.email === user.email
        );

        let newFavorites: User[];

        if (userIndex > -1) {
            newFavorites = currentFavorites.filter((_, i) => i !== userIndex);
        } else {
            newFavorites = [...currentFavorites, user as User];
        }

        persistFavoriteUsers(newFavorites);

        window.dispatchEvent(new CustomEvent(FAVORITES_CHANGED_EVENT));
    }, [user]);

    return { isFavorite, toggleFavorite, favoriteUsers };
};
