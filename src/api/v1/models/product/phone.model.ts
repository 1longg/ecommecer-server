import { IPhoneModel } from "@interfaces/model/product/phoneModel.interface";
import mongoose from "mongoose";

const COLLECTION_NAME = 'phones'
const MODEL_NAME = 'phone'

const PhoneSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: [String],
        required: true,
        enum: ['64GB', '128GB', '256GB', '512GB']
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}, {
    collection: COLLECTION_NAME,
})

export default mongoose.model<IPhoneModel>(MODEL_NAME, PhoneSchema)

