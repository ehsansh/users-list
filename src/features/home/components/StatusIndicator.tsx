import React from 'react';
import Loading from '@/components/loading/Loading';
import styles from './StatusIndicator.module.scss';

interface StatusIndicatorProps {
    isLoading: boolean;
    error: string | null;
    dataLength: number;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
    isLoading,
    error,
    dataLength
}) => {
    if (isLoading) {
        return (
            <div className={styles.loading}>
                <Loading />
            </div>
        );
    }
    if (error) {
        return <p className={styles.error}>{error}</p>;
    }
    if (dataLength === 0) {
        return <p className={styles.noData}>No users found</p>;
    }
    return null;
};

export default StatusIndicator;
