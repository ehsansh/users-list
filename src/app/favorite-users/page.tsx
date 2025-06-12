import React from 'react';
import FavoriteUsersPage from '@/features/favorite-users/components/FavoriteUsersPage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Favorite Users',
};

const Page = () => {
    return <FavoriteUsersPage />;
};

export default Page;
