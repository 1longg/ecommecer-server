import mongoose from "mongoose";

export interface ICartModelProducts  {
    product: mongoose.Types.ObjectId | string,
    quantity: number
}

export interface ICartModel{
    user: mongoose.Types.ObjectId | string,
    products: ICartModelProducts[]
    count_products: number,
    createdAt: Date,
    updatedAt: Date
}