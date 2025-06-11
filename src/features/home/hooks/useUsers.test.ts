import { renderHook, waitFor } from '@testing-library/react';
import { useUsers } from './useUsers';
import { fetchUsers } from '../api/fetchUsers';
import { User } from '@/types/user.types';

// 1. Mock the entire fetchUsers module
// This tells Jest: "Any time code tries to import from '../api/fetchUsers',
// give them a fake version instead of the real one."
jest.mock('../api/fetchUsers');

// Mock user data for our tests
const mockUsers: User[] = [
    { name: { first: 'Alice', last: 'Smith' }, email: 'alice@example.com' },
    { name: { first: 'Bob', last: 'Jones' }, email: 'bob@example.com' },
] as User[]; // Using 'as User[]' to simplify the mock data

// 2. Create a typed reference to our mocked function
const mockedFetchUsers = fetchUsers as jest.Mock;


describe('useUsers Hook', () => {

    // 3. Reset the mock before each test
    // This ensures that one test's behavior doesn't affect another's.
    beforeEach(() => {
        mockedFetchUsers.mockClear();
    });

    it('should fetch and set users on initial render', async () => {
        // 4. Define the mock's behavior for this specific test
        // Tell our fake function to return a promise that resolves with our mock data.
        mockedFetchUsers.mockResolvedValue(mockUsers);

        // Render the hook
        const { result } = renderHook(() => useUsers());

        // Initially, isLoading should be true
        expect(result.current.isLoading).toBe(true);

        // 5. Wait for the asynchronous logic to complete
        // `waitFor` will keep trying the callback until it no longer throws an error.
        await waitFor(() => {
            // After fetching, isLoading should be false
            expect(result.current.isLoading).toBe(false);
        });

        // 6. Assert the final state
        // The users array should now contain our mock data
        expect(result.current.users).toEqual(mockUsers);
        // The API function should have been called
        expect(mockedFetchUsers).toHaveBeenCalledTimes(1);
    });

    it('should handle API errors gracefully', async () => {
        // For this test, make the API call fail
        const errorMessage = 'Failed to fetch';
        mockedFetchUsers.mockRejectedValue(new Error(errorMessage));

        const { result } = renderHook(() => useUsers());

        // Wait for the hook to finish its useEffect
        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        // The error state should be updated
        expect(result.current.error).toBe('Failed to fetch users');
        // The users array should remain empty
        expect(result.current.users).toHaveLength(0);
    });
});