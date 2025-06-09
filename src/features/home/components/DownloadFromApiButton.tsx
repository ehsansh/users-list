import React from 'react';
import styles from './DownloadFromApiButton.module.scss';

interface DownloadButtonProps {
    nationalityFilter?: string;
    genderFilter?: string;
    resultsToDownload?: number;
    format?: 'csv' | 'xml' | 'yaml';
    disabled?: boolean;
}

const DownloadFromApiButton = ({
    nationalityFilter,
    genderFilter,
    resultsToDownload = 100,
    format = 'csv',
    disabled
}: DownloadButtonProps) => {
    const handleDownload = () => {
        if (disabled) return;
        const params = new URLSearchParams();
        if (nationalityFilter) {
            params.append('nat', nationalityFilter);
        }
        if (genderFilter) {
            params.append('gender', genderFilter);
        }
        params.append('results', String(resultsToDownload));
        params.append('format', format);
        params.append('dl', ''); // The 'dl' parameter triggers the download
        const downloadUrl = `https://randomuser.me/api/?${params.toString()}`;
        // Open the URL in a new tab to trigger the browser's download functionality
        window.open(downloadUrl, '_blank');
    };

    return (
        <button
            onClick={handleDownload}
            className={styles.downloadButton}
            disabled={disabled}
            title={`Download ${resultsToDownload} users from API as ${format.toUpperCase()}`}
        >
            Download from API
        </button>
    );
};

export default DownloadFromApiButton;
