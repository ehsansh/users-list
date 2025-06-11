import { renderHook, act } from '@testing-library/react';
import { useFavorite } from './useFavorite';
import { User } from '@/types/user.types';

// Mock user data for our tests
const mockUser: Partial<User> = {
    name: { title: 'Mr', first: 'John', last: 'Doe' },
    email: 'john.doe@example.com',
    login: { username: 'johndoe' },
    picture: { large: '', medium: '', thumbnail: '' },
};

// We need to mock localStorage because it's not available in Jest's environment
const localStorageMock = (() => {
    let store: { [key: string]: string } = {};
    return {
        getItem: function (key: string) {
            return store[key] || null;
        },
        setItem: function (key: string, value: string) {
            store[key] = value.toString();
        },
        clear: function () {
            store = {};
        },
        removeItem: function (key: string) {
            delete store[key];
        }
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: localStorageMock
});


describe('useFavorite Hook', () => {

    // Clear localStorage before each test to ensure tests are isolated
    beforeEach(() => {
        window.localStorage.clear();
    });

    it('should correctly toggle a user as a favorite', () => {
        // Render the hook with our mock user
        const { result } = renderHook(() => useFavorite(mockUser));

        // 1. Initially, the user should not be a favorite
        expect(result.current.isFavorite).toBe(false);

        // 2. "act" is used to wrap any code that causes state updates
        act(() => {
            result.current.toggleFavorite();
        });

        // 3. After toggling, the user should now be a favorite
        expect(result.current.isFavorite).toBe(true);

        // 4. Toggle again
        act(() => {
            result.current.toggleFavorite();
        });

        // 5. After toggling again, the user should no longer be a favorite
        expect(result.current.isFavorite).toBe(false);
    });

    it('should initialize with the correct favorite status from localStorage', () => {
        // Pre-populate localStorage with our mock user
        localStorage.setItem('favoriteUsers', JSON.stringify([mockUser]));

        // Render the hook
        const { result } = renderHook(() => useFavorite(mockUser));

        // The hook should read from localStorage and know the user is already a favorite
        expect(result.current.isFavorite).toBe(true);
    });
});