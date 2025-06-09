'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { User } from '@/types/user.types';
import { fetchUsers } from '@/features/home/api/fetchUsers';
import UsersList from '@/components/users-list/UsersList';
import styles from './HomePage.module.scss';
import NationalityFilter from '@/features/home/components/NationalityFilter';
import GenderFilter from '@/features/home/components/GenderFilter';
import StatusIndicator from '@/features/home/components/StatusIndicator';

const HomePage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [nationality, setNationality] = useState('');
    const [gender, setGender] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState<number>(1);
    const currentPage = useRef(1);

    const fetchUserData = async () => {
        const hasPageChanged = currentPage.current !== page;
        if (!hasMore) return;
        setIsLoading(true);
        try {
            const fetchedUsers = await fetchUsers({
                page: hasPageChanged ? page : 1,
                resultsPerPage: 5,
                nationality,
                gender
            });
            if (hasPageChanged) {
                currentPage.current = page;
                setUsers((pervUsers) => [...pervUsers, ...fetchedUsers]);
            } else setUsers(fetchedUsers);
            setHasMore(fetchedUsers.length === 5);
        } catch (err) {
            setError('Failed to fetch users');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, [nationality, gender, page]);

    const observer = useRef<IntersectionObserver | null>(null);
    const lastUserElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (isLoading && !hasMore) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            });
            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

    return (
        <div className={styles.home}>
            <NationalityFilter
                currentNationality={nationality}
                setNationality={setNationality}
                disabled={!(users && users.length > 0)}
            />
            <GenderFilter
                currentGender={gender}
                setGender={setGender}
                disabled={!(users && users.length > 0)}
            />

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
