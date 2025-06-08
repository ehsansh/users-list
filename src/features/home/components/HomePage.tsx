'use client';
import React, { useState, useEffect } from 'react';
import { User } from '@/types/user.types';
import { fetchUsers } from '@/features/home/api/fetchUsers';
import UsersList from '@/components/users-list/UsersList';
import styles from './HomePage.module.scss';

const HomePage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [nationality, setNationality] = useState('');
    const [gender, setGender] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            try {
                const fetchedUsers = await fetchUsers({
                    page: 1,
                    resultsPerPage: 5,
                    nationality,
                    gender
                });
                setUsers(fetchedUsers);
            } catch (err) {
                console.error('Error fetching users:', err);
                setError('Failed to fetch users');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [nationality, gender]);

    return (
        <div className={styles.home}>
            {isLoading && (
                <p className={styles.home__loading}>Loading users...</p>
            )}
            {error && !isLoading && (
                <p className={styles.home__error}>{error}</p>
            )}
            {!isLoading && users.length == 0 && (
                <p className={styles.home__noUser}>No users found</p>
            )}
            {users.length > 0 && <UsersList users={users} />}
        </div>
    );
};

export default HomePage;
