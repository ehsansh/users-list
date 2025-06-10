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
        setFavoriteUsers(getFavoriteUsers());
    }, []);

    useEffect(() => {
        const isUserFavorite =
            !!user?.email &&
            favoriteUsers.some((favUser) => favUser.email === user.email);
        setIsFavorite(isUserFavorite);
    }, [user, favoriteUsers]);

    const toggleFavorite = useCallback(() => {
        if (!user || !user.email) return;

        const userIndex = favoriteUsers.findIndex(
            (favUser) => favUser.email === user.email
        );

        let newFavorites: User[];

        if (userIndex > -1) {
            newFavorites = favoriteUsers.filter((_, i) => i !== userIndex);
        } else {
            newFavorites = [...favoriteUsers, user as User];
        }

        setFavoriteUsers(newFavorites);
        persistFavoriteUsers(newFavorites);
    }, [user, favoriteUsers]);

    return { isFavorite, toggleFavorite, favoriteUsers };
};
