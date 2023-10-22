import { IKeyTokenModel } from "@interfaces/model/keyTokenModel.interface";
import mongoose from "mongoose";

const COLLECTION_NAME = 'keyTokens'
const MODEL_NAME = 'KeyToken'

const keyTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    refreshToken: {
        type: String,
        require: true
    },
    publicKey: {
        type: String,
        require: true
    },
    privateKey: {
        type: String,
        require: true
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME,
})

export default mongoose.model<IKeyTokenModel>(MODEL_NAME, keyTokenSchema)