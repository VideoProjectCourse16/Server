export interface UserSignin {
    username: string;
    password: string;
    admin: boolean;
}
export interface UserSignup {
    name: string;
    surname: string;
    username: string;
    password: string;
    admin: boolean;
    repeatPassword:string;
}
export interface User {
    name: string;
    surname: string;
    username: string;
    password: string;
    admin: boolean;
    repeatPassword:string;
}