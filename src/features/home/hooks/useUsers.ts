import { useState, useEffect, useCallback, useRef } from 'react';
import { User } from '@/types/user.types';
import { fetchUsers } from '@/features/home/api/fetchUsers';

const resultsPerPage = parseInt(process.env.NEXT_PUBLIC_RESULTS_PER_PAGE || '20');

/**
 * Custom hook for managing users list with infinite scrolling and filtering.
 * Features debouncing for API requests and limits the number of stored users
 * to enhance performance.
 */
export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [nationality, setNationality] = useState('');
    const [gender, setGender] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState<number>(1);
    const currentPage = useRef(1);
    // Ref to store the debounce timer
    const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

    // This effect resets the user list and pagination whenever a filter is changed.
    useEffect(() => {
        setPage(1);
        setUsers([]);
        setHasMore(true);
    }, [nationality, gender]);

    const fetchUserData = useCallback(() => {
        if (!hasMore) return;

        setIsLoading(true);
        // Debounce API requests to prevent rapid requests
        if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

        // Set a 300ms timer to delay the API call
        debounceTimeout.current = setTimeout(async () => {
            try {
                const fetchedUsers = await fetchUsers({
                    page,
                    resultsPerPage,
                    nationality,
                    gender
                });

                currentPage.current = page;
                // When page is 1, replace users. Otherwise, append.
                setUsers((prevUsers) =>
                    page === 1 ? fetchedUsers : [...prevUsers.slice(-200), ...fetchedUsers]
                );
                setHasMore(fetchedUsers.length === resultsPerPage);
            } catch {
                setError('Failed to fetch users');
            } finally {
                setIsLoading(false);
            }
        }, 300); // Debounce delay
    }, [page, nationality, gender, hasMore]);

    // This effect is now responsible only for triggering the fetch.
    useEffect(() => {
        fetchUserData();
    }, [fetchUserData]);

    // Intersection Observer for implementing infinite scroll
    const observer = useRef<IntersectionObserver | null>(null);
    const lastUserElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (!hasMore || isLoading) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                // When the last user card is intersecting with the viewport, load the next page
                if (entries[0].isIntersecting) {
                    setPage((prev) => prev + 1);
                }
            });

            if (node) observer.current.observe(node);
        },
        [isLoading, hasMore]
    );

    return {
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
    };
};
