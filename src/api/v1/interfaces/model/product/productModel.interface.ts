import mongoose from "mongoose";

export interface IProductModel {
    _id: mongoose.Types.ObjectId
    name: string
    price: number
    sold: number
    image: [string]
    quantity: number
    description: string
    category: string
    rating: number
    belongTo: mongoose.Types.ObjectId
    createdAt: Date
    updatedAt: Date
    attributes: mongoose.Schema.Types.Mixed
}