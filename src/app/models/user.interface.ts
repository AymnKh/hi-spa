import { Messages } from "./messages.interface"

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
    followers: Followers[]
    following: Following[]
    notifications: Notifications[]
    chatList: chat[]
    _id: string
}

export interface chat {
    receiverId: User,
    messageId: Messages
}

export interface Post {
    _id: string
    username: string
    post: string
    totalLikes: number
    comments: Comments[]
    likes: any[]
    createdAt: string
    updatedAt: string
    __v: number

}

export interface Following {
    followedUser: User
    _id: string
}
export interface Followers {
    followerUser: User
    _id: string
}
export interface Comments {
    _id: string
    username: string
    comment: string
    createdAt: string
}
export interface Notifications {
    _id: string
    action: string
    createdAt: string
    senderId: string
    read: boolean
    viewProfile: boolean
}

