export interface IRequestBodySignIn {
    username: string,
    password: string
}

export interface IRequestBodySignUp {
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
} 

export interface IRequestBodyGetNewAccessToken {
    refreshToken: string
}