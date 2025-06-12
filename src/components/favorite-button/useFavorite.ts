import { useState, useEffect, useCallback } from 'react';
import { User } from '@/types/user.types';

const FAVORITES_KEY = 'favoriteUsers';
const FAVORITES_CHANGED_EVENT = 'favoritesChanged';

/**
 * Retrieves the list of favorite users from localStorage
 * @returns Array of User objects stored as favorites
 */
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

/**
 * Saves the list of favorite users to localStorage
 * @param users Array of User objects to persist
 */
const persistFavoriteUsers = (users: User[]) => {
    try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(users));
    } catch (error) {
        console.error('Error writing favorites to localStorage', error);
    }
};

/**
 * Custom hook for managing favorite users functionality
 * @param user The user object to check/add/remove from favorites
 * @returns Object containing favorite status, toggle function, list of favorites, and loading state
 */
export const useFavorite = (user: Partial<User> | null) => {
    const [favoriteUsers, setFavoriteUsers] = useState<User[]>([]);
    const [isFavorite, setIsFavorite] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Listen for changes in favorites across components
    // This effect sets up a global event listener to keep favorites in sync
    useEffect(() => {
        const handleFavoritesChange = () => {
            setFavoriteUsers(getFavoriteUsers());
        };

        // Initial load of favorites
        handleFavoritesChange();
        setIsLoading(false);

        // Set up event listener for cross-component synchronization
        window.addEventListener(FAVORITES_CHANGED_EVENT, handleFavoritesChange);
        return () => {
            window.removeEventListener(FAVORITES_CHANGED_EVENT, handleFavoritesChange);
        };
    }, []);

    // Update isFavorite state whenever user or favoriteUsers changes
    // This ensures the favorite status is always in sync with the current state
    useEffect(() => {
        const isUserFavorite =
            !!user?.email &&
            favoriteUsers.some((favUser) => favUser.email === user.email);
        setIsFavorite(isUserFavorite);
    }, [user, favoriteUsers]);

    // Toggle favorite status for the current user
    // Uses a custom event to notify other components of the change
    const toggleFavorite = useCallback(() => {
        if (!user || !user.email) return;

        const currentFavorites = getFavoriteUsers();

        // Find if user is already in favorites
        const userIndex = currentFavorites.findIndex(
            (favUser) => favUser.email === user.email
        );

        let newFavorites: User[];

        // Remove user if already favorited, add if not
        if (userIndex > -1) {
            newFavorites = currentFavorites.filter((_, i) => i !== userIndex);
        } else {
            newFavorites = [...currentFavorites, user as User];
        }

        // Persist changes and notify other components
        persistFavoriteUsers(newFavorites);
        window.dispatchEvent(new CustomEvent(FAVORITES_CHANGED_EVENT));
    }, [user]);

    return { isFavorite, toggleFavorite, favoriteUsers, isLoading };
};
