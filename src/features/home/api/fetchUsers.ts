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
        let apiUrl = `${API_BASE_URL}?results=${resultsPerPage}&page=${page}`;
        if (nationality?.trim()) {
            apiUrl += `&nat=${nationality.trim()}`;
        }
        if (gender?.trim()) {
            apiUrl += `&gender=${gender.trim().toLowerCase()}`;
        }

        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch users');
        }

        const data: ApiResponse = await response.json();
        return data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
}
