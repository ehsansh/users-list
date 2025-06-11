'use client';
import React from 'react';
import UsersList from '@/components/users-list/UsersList';
import styles from './HomePage.module.scss';
import NationalityFilter from '@/features/home/components/NationalityFilter';
import GenderFilter from '@/features/home/components/GenderFilter';
import StatusIndicator from '@/features/home/components/StatusIndicator';
import DownloadCurrentUsersListButton from '@/features/home/components/DownloadCurrentUsersListButton';
import DownloadFromApiButton from '@/features/home/components/DownloadFromApiButton';
import { useUsers } from '@/features/home/hooks/useUsers';

const HomePage = () => {
    const {
        users,
        nationality,
        gender,
        isLoading,
        error,
        page,
        setNationality,
        setGender,
        lastUserElementRef,
        currentPage
    } = useUsers();

    const disabled = !(users && users.length > 0);

    return (
        <div className={styles.home}>
            <div className={styles.home__filters}>
                <NationalityFilter
                    currentNationality={nationality}
                    setNationality={setNationality}
                    disabled={disabled}
                />
                <GenderFilter
                    currentGender={gender}
                    setGender={setGender}
                    disabled={disabled}
                />
                <DownloadCurrentUsersListButton
                    users={users}
                    disabled={disabled}
                />
                <DownloadFromApiButton
                    resultsToDownload={100}
                    disabled={disabled}
                    format={'csv'}
                    genderFilter={gender}
                    nationalityFilter={nationality}
                />
            </div>
            {(!isLoading || page > currentPage.current) && users.length > 0 && (
                <UsersList
                    users={users}
                    lastUserElementRef={lastUserElementRef}
                />
            )}
            <StatusIndicator
                isLoading={isLoading}
                error={error}
                dataLength={users.length}
            />
        </div>
    );
};

export default HomePage;
