import React from 'react';
import { User } from '@/types/user.types';
import UserCard from '@/components/user-card/UserCard';
import styles from './UsersList.module.scss';
interface UsersListProps {
    users: User[];
    lastUserElementRef?: (node: HTMLDivElement | null) => void;
}

const UsersList = ({ users, lastUserElementRef }: UsersListProps) => {
    const lastElementIndex = users.length - 1;
    return (
        <div className={styles.userGrid}>
            <h2 className={styles.userGrid__title}>Fetched User Data:</h2>
            {users.map((user: User, index: number) => (
                <div
                    key={user.login.username}
                    ref={index === lastElementIndex ? lastUserElementRef : null}
                >
                    <UserCard user={user} />
                </div>
            ))}
        </div>
    );
};

export default UsersList;
