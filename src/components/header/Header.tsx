import React from 'react';
import Link from 'next/link';
import styles from './Header.module.scss';

const Header = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link href="/" className={styles.link}>
                    Home
                </Link>
                <Link href="/favorite-users" className={styles.link}>
                    Favorite Users
                </Link>
            </nav>
        </header>
    );
};

export default Header; 