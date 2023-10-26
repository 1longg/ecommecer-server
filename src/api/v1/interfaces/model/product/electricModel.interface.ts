import mongoose from "mongoose"

export interface IElectricModel {
    _id: mongoose.Types.ObjectId
    model: [string]
    brand: string
}