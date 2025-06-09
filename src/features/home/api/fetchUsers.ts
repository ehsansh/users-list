import { User, ApiResponse } from '@/types/user.types';

const API_BASE_URL = 'https://randomuser.me/api/';

export async function fetchUsers({
    page = 1,
    resultsPerPage,
    nationality,
    gender
}: {
    page?: number;
    resultsPerPage?: number;
    nationality?: string;
    gender?: string;
}): Promise<User[]> {
    try {
        let apiUrl = `${API_BASE_URL}?results=${resultsPerPage}`;
        if (nationality?.trim()) {
            apiUrl += `&nat=${nationality.trim()}`;
        }
        if (gender?.trim()) {
            apiUrl += `&gender=${gender.trim().toLowerCase()}`;
        }

        apiUrl += `&page=${page}&seed=users`;

        console.log(apiUrl);

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data: ApiResponse = await response.json();
        console.log(data.results);
        return data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
}
