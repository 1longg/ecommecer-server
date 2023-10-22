import mongoose from "mongoose";

export interface IKeyTokenModel {
    user: mongoose.Schema.Types.ObjectId;
    refreshToken: string;
    publicKey: string;
    privateKey: string;
    createdAt: Date;
    updatedAt: Date;
}