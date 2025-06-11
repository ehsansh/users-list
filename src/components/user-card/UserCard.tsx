import React from 'react';
import { User } from '@/types/user.types';
import styles from './UserCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from '@/components/favorite-button/FavoriteButton';
import UserIcon from '@/components/icons/UserIcon';

interface UserCardProps {
    user: Partial<User>;
}

const UserCard = ({ user }: UserCardProps) => {
    const fullName = [user.name?.title, user.name?.first, user.name?.last]
        .filter(Boolean)
        .join(' ');

    const addressParts = [
        user.location?.street?.number,
        user.location?.street?.name,
        user.location?.city,
        user.location?.state,
        user.location?.postcode,
        user.location?.country
    ].filter(Boolean);

    const fullAddress =
        addressParts.length > 2 ? addressParts.join(', ') : null;

    return (
        <div className={styles.userCard}>
            <div className={styles.userCard__identity}>
                {user.picture?.medium ? (
                    <Image
                        className={styles.userCard__picture}
                        src={user.picture.medium}
                        alt={fullName}
                        width={70}
                        height={70}
                    />
                ) : (
                    <UserIcon
                        className={styles.userCard__picture}
                        width={70}
                        height={70}
                    />
                )}
                <div className={styles.userCard__info}>
                    <div className={styles.userCard__nameHeader}>
                        <Link
                            href={`/profile?name=${fullName}&email=${user.email}`}
                            className={styles.userCard__nameLink}
                        >
                            <h3 className={styles.userCard__name}>
                                {fullName}
                            </h3>
                        </Link>
                        <FavoriteButton user={user} />
                    </div>

                    <p className={styles.userCard__meta}>
                        {user.login?.username}
                        {user.gender && ` / ${user.gender}`}
                    </p>
                </div>
            </div>
            {(user.phone || user.email || fullAddress) && (
                <div className={styles.userCard__details}>
                    <div className={styles.userCard__contact}>
                        {user.phone && (
                            <p className={styles.userCard__phone}>
                                {user.phone}
                            </p>
                        )}
                        {user.email && (
                            <p className={styles.userCard__email}>
                                <a
                                    href={`mailto:${user.email}`}
                                    className={styles.userCard__emailLink}
                                >
                                    {user.email}
                                </a>
                            </p>
                        )}
                        {fullAddress && (
                            <p className={styles.userCard__address}>
                                {fullAddress}
                            </p>
                        )}
                    </div>
                </div>
            )}
            {user.nat && user.location?.country && (
                <div className={styles.userCard__nationality}>
                    <Image
                        src={`${process.env.NEXT_PUBLIC_FLAG_BASE_URL}${user.nat.toLowerCase()}.png`}
                        alt={`Flag of ${user.location.country}`}
                        width={30}
                        height={20}
                        title={user.location.country}
                    />
                </div>
            )}
        </div>
    );
};

export default UserCard;
