import mongoose from "mongoose"

export interface IJwtPayLoad {
    _id: mongoose.Types.ObjectId,
    email: string
}