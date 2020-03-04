import mongoose from "mongoose"

export type User = {
    _id: mongoose.Schema.Types.ObjectId,
    email: string,
    username: string,
    password: string,
}

export type Session = {
    _id: mongoose.Schema.Types.ObjectId,
    user: any
    fingerprint: string,
    expiresIn: number
    created_at: string
}