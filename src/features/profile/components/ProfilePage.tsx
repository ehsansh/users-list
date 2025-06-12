'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import styles from './ProfilePage.module.scss';
import FavoriteButton from '@/components/favorite-button/FavoriteButton';
import { User } from '@/types/user.types';

/**
 * Profile page component that displays user information
 * Data is passed through URL query parameters:
 * - name: User's full name
 * - email: User's email address
 */
const ProfilePage = () => {
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const email = searchParams.get('email');

    const user: Partial<User> = {
        name: { first: name || '', last: '', title: '' },
        email: email || '',
    };

    return (
        <div className={styles.profilePage}>
            <div className={styles.profileCard}>
                <div className={styles.profileCard__header}>
                    <h1>{name}</h1>
                    <FavoriteButton size="large" user={user} />
                </div>
                <a href={`mailto:${email}`} className={styles.email}>
                    {email}
                </a>
            </div>
        </div>
    );
};

export default ProfilePage;
