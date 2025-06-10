'use client';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import styles from './ProfilePage.module.scss';
import FavoriteButton from '@/components/user-card/FavoriteButton';

const ProfilePage = () => {
    const searchParams = useSearchParams();
    const name = searchParams.get('name');
    const email = searchParams.get('email');
    return (
        <div className={styles.profilePage}>
            <div className={styles.profileCard}>
                <div className={styles.profileCard__header}>
                    <h1>{name}</h1>
                    <FavoriteButton size="large" />
                </div>
                <a href={`mailto:${email}`} className={styles.email}>
                    {email}
                </a>
            </div>
        </div>
    );
};

export default ProfilePage;
