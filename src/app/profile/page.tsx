import ProfilePage from '@/features/profile/components/ProfilePage';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Profile',
};


const Page = () => {
    return <ProfilePage />;
};

export default Page;
