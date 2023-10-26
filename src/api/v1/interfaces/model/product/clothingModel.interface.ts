import mongoose from "mongoose"

export interface IClothingModel {
    _id: mongoose.Types.ObjectId
    size: [number]
    brand: string
}