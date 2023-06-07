export interface Messages {
    _id: string;
    messages: Message[];
    conversationId: string;
    sender: string;
    __v: number;
}

export interface Message {
    senderId: string;
    senderName: string;
    receiverName: string;
    body: string;
    isRead: boolean;
    createdAt: Date;
    _id: string;
    receiverId?: string;
}
