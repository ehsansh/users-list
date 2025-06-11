import { useState, useEffect, useCallback, useRef } from 'react';
import { User } from '@/types/user.types';
import { fetchUsers } from '@/features/home/api/fetchUsers';

export const useUsers = () => {
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