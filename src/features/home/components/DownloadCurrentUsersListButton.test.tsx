import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DownloadCurrentUsersListButton from './DownloadCurrentUsersListButton';
import { convertToCSV } from '../utils/convertToCSV';
import { User } from '@/types/user.types';

// 1. Mock the utility function module
jest.mock('../utils/convertToCSV');

// Create a typed reference to the mocked function
const mockedConvertToCSV = convertToCSV as jest.Mock;

// Mock data
const mockUsers: User[] = [
    { name: { first: 'Alice' } },
    { name: { first: 'Bob' } },
] as User[];

describe('DownloadCurrentUsersListButton', () => {

    beforeAll(() => {
        // JSDOM doesn't implement createObjectURL, so we mock it.
        // We also mock revokeObjectURL which is called by the component.
        window.URL.createObjectURL = jest.fn();
        window.URL.revokeObjectURL = jest.fn();
    });

    beforeEach(() => {
        // Clear mock history before each test
        mockedConvertToCSV.mockClear();
    });

    it('should be disabled when the disabled prop is true', () => {
        // 2. Render the component
        render(<DownloadCurrentUsersListButton users={[]} disabled={true} />);

        // 3. Find the button and assert it's disabled
        const button = screen.getByRole('button', { name: /download current user list/i });
        expect(button).toBeDisabled();
    });

    it('should be enabled when the disabled prop is false', () => {
        render(<DownloadCurrentUsersListButton users={mockUsers} disabled={false} />);

        const button = screen.getByRole('button', { name: /download current user list/i });
        expect(button).not.toBeDisabled();
    });

    it('should call convertToCSV with the correct users when clicked', async () => {
        // For this test, we can just have the mock return an empty string
        mockedConvertToCSV.mockReturnValue('');

        render(<DownloadCurrentUsersListButton users={mockUsers} disabled={false} />);

        const button = screen.getByRole('button', { name: /download current user list/i });

        // 4. Simulate a user click
        await userEvent.click(button);

        // 5. Verify the mock was called correctly
        expect(mockedConvertToCSV).toHaveBeenCalledTimes(1);
        expect(mockedConvertToCSV).toHaveBeenCalledWith(mockUsers);
    });
});