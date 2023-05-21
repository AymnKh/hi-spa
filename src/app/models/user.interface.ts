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
    posts: Post[]
    _id: string
}

export interface Post {
    _id: string
    username: string
    post: string
    totalLikes: number
    comments: any[]
    likes: any[]
    createdAt: string
    updatedAt: string
    __v: number

}