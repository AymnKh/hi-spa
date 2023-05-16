export interface SignupResponse {
    message: string
    user: User
    token: string
}

export interface User {
    firstname: string
    lastname: string
    email: string
    username: string
    password: string
    _id: string
}
