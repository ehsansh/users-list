export interface UserName {
    title: string;
    first: string;
    last: string;
}

export interface UserPicture {
    large: string;
    medium: string;
    thumbnail: string;
}

export interface UserLocationStreet {
    number: number;
    name: string;
}

export interface UserLocation {
    street: UserLocationStreet;
    city: string;
    state: string;
    country: string;
    postcode: string;
}

export interface UserLogin {
    username: string;
}

export interface User {
    name: UserName;
    email: string;
    login: UserLogin;
    gender: string;
    picture: UserPicture;
    phone: string;
    location: UserLocation;
    nat: string;
}

export interface ApiResponse {
    results: User[];
}
