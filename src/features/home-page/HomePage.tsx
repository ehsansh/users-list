'use client';
import React, { useState, useEffect } from 'react';
import { User } from '@/types/user.types';
import { fetchUsers } from '@/features/users-list/api/fetchUsers';

const HomePage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [nationality, setNationality] = useState('');
    const [gender, setGender] = useState('');
    const [isLoading, setIsLoading] = useState(false);
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
        <div>
            {isLoading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <ul>
                {users.map((user, index) => (
                    <li key={index}>
                        {user.name.first} {user.name.last}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
