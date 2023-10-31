import mongoose from "mongoose";

export interface ICartModelProducts  {
    product: mongoose.Types.ObjectId 
    quantity: number
}

export interface ICartModel{
    user: mongoose.Types.ObjectId
    products: ICartModelProducts[]
    count_products: number,
    createdAt: Date,
    updatedAt: Date
}