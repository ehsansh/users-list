import { useState, useEffect, useCallback, useRef } from 'react';
import { User } from '@/types/user.types';
import { fetchUsers } from '@/features/home/api/fetchUsers';

/**
 * Custom hook for managing users list with infinite scrolling and filtering
 * Handles pagination, nationality/gender filtering, and loading states
 */
export const useUsers = () => {
    const resultsPerPage = parseInt(process.env.NEXT_PUBLIC_RESULTS_PER_PAGE || '5');
    const [users, setUsers] = useState<User[]>([]);
    const [nationality, setNationality] = useState('');
    const [gender, setGender] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState<number>(1);
    // Keep track of the current page to handle filter changes
    const currentPage = useRef(1);

    const fetchUserData = async () => {
        const hasPageChanged = currentPage.current !== page;
        if (!hasMore) return;
        setIsLoading(true);
        try {
            const fetchedUsers = await fetchUsers({
                page: hasPageChanged ? page : 1,
                resultsPerPage: resultsPerPage,
                nationality,
                gender
            });
            // If page changed, append new users; otherwise replace the list
            if (hasPageChanged) {
                currentPage.current = page;
                setUsers((pervUsers) => [...pervUsers, ...fetchedUsers]);
            } else setUsers(fetchedUsers);
            // If we got fewer results than requested, we've reached the end
            setHasMore(fetchedUsers.length === resultsPerPage);
        } catch (err) {
            setError('Failed to fetch users');
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch users when filters or page changes
    useEffect(() => {
        fetchUserData();
    }, [nationality, gender, page]);

    // Set up intersection observer for infinite scrolling
    const observer = useRef<IntersectionObserver | null>(null);
    const lastUserElementRef = useCallback(
        (node: HTMLDivElement | null) => {
            if (isLoading && !hasMore) return;
            if (observer.current) observer.current.disconnect();
            observer.current = new IntersectionObserver((entries) => {
                // When the last element is visible, load the next page
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