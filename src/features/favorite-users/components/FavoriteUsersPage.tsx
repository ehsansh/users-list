'use client';
import React from 'react';
import { useFavorite } from '@/components/favorite-button/useFavorite';
import UsersList from '@/components/users-list/UsersList';
import styles from './FavoriteUsersPage.module.scss';

const FavoriteUsersPage = () => {
    const { favoriteUsers } = useFavorite(null);
    return (
        <div className={styles.favoriteUsersPage}>
            <h1 className={styles.favoriteUsersPage__title}>Favorite Users</h1>
            {favoriteUsers.length > 0 ? (
                <UsersList users={favoriteUsers} />
            ) : (
                <p className={styles.favoriteUsersPage__noUsers}>
                    You have no favorite users yet.
                </p>
            )}
        </div>
    );
};

export default FavoriteUsersPage;
