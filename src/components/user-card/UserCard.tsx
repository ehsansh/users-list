import React from 'react';
import { User } from '@/types/user.types';
import styles from './UserCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from '@/components/favorite-button/FavoriteButton';

interface UserCardProps {
    user: User;
}

const UserCard = ({ user }: UserCardProps) => {
    return (
        <div className={styles.userCard}>
            <div className={styles.userCard__identity}>
                <Image
                    className={styles.userCard__picture}
                    src={user.picture.medium}
                    alt={`${user.name.first} ${user.name.last}`}
                    width={70}
                    height={70}
                />
                <div className={styles.userCard__info}>
                    <div className={styles.userCard__nameHeader}>
                        <Link
                            href={`/profile?name=${user.name.first} ${user.name.last}&email=${user.email}`}
                            className={styles.userCard__nameLink}
                        >
                            <h3 className={styles.userCard__name}>
                                {user.name.title} {user.name.first}{' '}
                                {user.name.last}
                            </h3>
                        </Link>
                        <FavoriteButton user={user} />
                    </div>

                    <p className={styles.userCard__meta}>
                        {user.login.username} / {user.gender}
                    </p>
                </div>
            </div>
            <div className={styles.userCard__details}>
                <div className={styles.userCard__contact}>
                    <p className={styles.userCard__phone}>{user.phone}</p>
                    <p className={styles.userCard__email}>
                        <a
                            href={`mailto:${user.email}`}
                            className={styles.userCard__emailLink}
                        >
                            {user.email}
                        </a>
                    </p>
                    <p className={styles.userCard__address}>
                        {user.location.street.number}{' '}
                        {user.location.street.name}, {user.location.city},{' '}
                        {user.location.state}, {user.location.postcode},{' '}
                        {user.location.country}
                    </p>
                </div>
            </div>
            <div className={styles.userCard__nationality}>
                <Image
                    src={`https://flagcdn.com/w40/${user.nat.toLowerCase()}.png`}
                    alt={user.location.country}
                    width={30}
                    height={20}
                    title={user.location.country}
                />
            </div>
        </div>
    );
};

export default UserCard;
