import mongoose from "mongoose"

export interface IPhoneModel {
    _id: mongoose.Types.ObjectId
    model: [string]
    brand: string
}