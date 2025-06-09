import React from 'react';
import { User } from '@/types/user.types';
import { convertToCSV } from '@/features/home/utils/convertToCSV';
import styles from './DownloadCurrentUsersListButton.module.scss';

interface DownloadButtonProps {
    users: User[];
    disabled?: boolean;
}

const DownloadCurrentUsersListButton = ({
    users,
    disabled
}: DownloadButtonProps) => {
    const handleDownload = () => {
        if (disabled) return;
        const csvData = convertToCSV(users);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute(
            'download',
            `users-${new Date().toISOString().split('T')[0]}.csv`
        );
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    return (
        <button
            onClick={handleDownload}
            className={styles.downloadButton}
            disabled={disabled}
            title={
                disabled
                    ? 'No users to download'
                    : 'Download current user list as CSV'
            }
        >
            Download Current User List
        </button>
    );
};

export default DownloadCurrentUsersListButton;
