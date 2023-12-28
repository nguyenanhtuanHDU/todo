export interface IUser {
    _id: string
    username: string | null
    password: string | null 
    city: string
    createdAt: Date
    updatedAt: Date
}
