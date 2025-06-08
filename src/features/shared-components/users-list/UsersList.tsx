import React from 'react';
import { User } from '@/types/user.types';
import UserCard from '@/features/shared-components/user-card/UserCard';
import styles from './UsersList.module.scss';
interface UsersListProps {
    users: User[];
}

const UsersList = ({ users }: UsersListProps) => {
    if (!users || users.length === 0) {
        return <p>No users found or failed to fetch users.</p>;
    }
    return (
        <div className={styles.userGrid}>
            <h2 className={styles.userGrid__title}>Fetched User Data:</h2>
            {users.map((user) => (
                <UserCard key={user.login.username} user={user} />
            ))}
        </div>
    );
};

export default UsersList;
