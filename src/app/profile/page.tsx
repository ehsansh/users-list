import ProfilePage from '@/features/profile/components/ProfilePage';
import { Metadata } from 'next';

type Props = {
    searchParams: { [key: string]: string | string[] | undefined };
};


export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const params = await searchParams; // ✅ Await searchParams
    const nameParam = params['name'];
    const name = Array.isArray(nameParam) ? nameParam[0] : nameParam;

    return {
        title: `${name || 'User'}'s Profile`,
    };
}



const Page = () => {
    return <ProfilePage />;
};

export default Page;
