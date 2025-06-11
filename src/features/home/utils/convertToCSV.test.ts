import { convertToCSV } from './convertToCSV';
import { User } from '@/types/user.types';

// Create a complete mock user
const mockUsers: User[] = [
    {
        gender: 'male',
        name: { title: 'Mr', first: 'John', last: 'Doe' },
        location: {
            street: { number: 123, name: 'Main St' },
            city: 'Anytown',
            state: 'Anystate',
            country: 'USA',
            postcode: '12345',
        },
        email: 'john.doe@example.com',
        login: { username: 'johndoe' },
        phone: '555-1234',
        nat: 'US',
    },
    {
        gender: 'female',
        name: { title: 'Ms', first: 'Jane', last: 'Smith' },
        location: {
            street: { number: 456, name: 'Oak Ave' },
            city: 'Otherville',
            state: 'Otherstate',
            country: 'USA',
            postcode: '67890',
        },
        email: 'jane.smith@example.com',
        login: { username: 'janesmith' },
        phone: '555-5678',
        nat: 'US',
    },
] as User[]; // Using 'as User[]' because picture is missing but not used by the function

// Define the expected header row once
const expectedHeader = 'gender,title,first_name,last_name,email,username,phone,nationality,street_number,street_name,city,state,country,postcode';

describe('convertToCSV Utility', () => {

    it('should correctly convert an array of users to a CSV string', () => {
        const result = convertToCSV(mockUsers);

        const expectedCsv = [
            expectedHeader,
            'male,Mr,John,Doe,john.doe@example.com,johndoe,555-1234,US,123,Main St,Anytown,Anystate,USA,12345',
            'female,Ms,Jane,Smith,jane.smith@example.com,janesmith,555-5678,US,456,Oak Ave,Otherville,Otherstate,USA,67890'
        ].join('\n');

        expect(result).toBe(expectedCsv);
    });

    it('should return only the header row when given an empty array', () => {
        const result = convertToCSV([]);
        expect(result).toBe(expectedHeader);
    });


});
