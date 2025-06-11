import { User } from '@/types/user.types';
const escapeCsvValue = (value: string | number): string => {
    const stringValue = String(value);
    // If the value contains a comma, a quote, or a newline, wrap it in double quotes
    // and escape any existing double quotes by doubling them.
    if (/[",\n]/.test(stringValue)) {
        return `"${stringValue.replace(/"/g, '""')}"`;
    }
    return stringValue;
};

export const convertToCSV = (users: User[]): string => {
    const headers = [
        'gender',
        'title',
        'first_name',
        'last_name',
        'email',
        'username',
        'phone',
        'nationality',
        'street_number',
        'street_name',
        'city',
        'state',
        'country',
        'postcode'
    ];
    const csvRows = [headers.join(',')];

    if (!users || users.length === 0) {
        return csvRows.join('\n'); // Return headers even if there are no users
    }

    users.forEach((user) => {
        const row = [
            escapeCsvValue(user.gender),
            escapeCsvValue(user.name.title),
            escapeCsvValue(user.name.first),
            escapeCsvValue(user.name.last),
            escapeCsvValue(user.email),
            escapeCsvValue(user.login.username),
            escapeCsvValue(user.phone),
            escapeCsvValue(user.nat),
            escapeCsvValue(user.location.street.number),
            escapeCsvValue(user.location.street.name),
            escapeCsvValue(user.location.city),
            escapeCsvValue(user.location.state),
            escapeCsvValue(user.location.country),
            escapeCsvValue(user.location.postcode)
        ];
        csvRows.push(row.join(','));
    });
    return csvRows.join('\n');
};
