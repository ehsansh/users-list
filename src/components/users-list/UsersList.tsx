import React, { useMemo } from 'react';
import { User } from '@/types/user.types';
import UserCard from '@/components/user-card/UserCard';
import styles from './UsersList.module.scss';

interface UsersListProps {
    users: Partial<User>[];
    lastUserElementRef?: (node: HTMLDivElement | null) => void;
}

const UsersList = ({ users, lastUserElementRef }: UsersListProps) => {
    const lastElementIndex = users.length - 1;

    // Memoizing the mapped user list to prevent unnecessary recalculations
    const memoizedUserList = useMemo(() => {
        return users.map((user, index) => (
            <div
                key={user.email || index}
                ref={index === lastElementIndex ? lastUserElementRef : null}
            >
                <UserCard user={user} />
            </div>
        ));
    }, [users, lastUserElementRef]); // Recomputes only when `users` changes

    return <div className={styles.userGrid}>{memoizedUserList}</div>;
};

export default UsersList;
