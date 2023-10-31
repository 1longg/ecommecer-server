import { BadRequestError } from "@cores/error.respsonse";
import inventoryModel from "@models/inventory.model";
import mongoose from "mongoose";

export const addProductToInventory = async (product: mongoose.Types.ObjectId, quantity: number) => {
    const inventory = await inventoryModel.create({product, inStock: quantity})
    if(!inventory) throw new BadRequestError('Add product to inventory failed')
    return inventory
}

export const reservationInventory = async (cartId: mongoose.Types.ObjectId ,productId: mongoose.Types.ObjectId, quantity: number) => {
    const query = {product: productId, inStock: {$gte: quantity}},
    updateSet = {$inc: {inStock: -quantity}, $push: {reservation: {cart: cartId, quantity}}},
    option = {upsert: true, new: true}

    return await inventoryModel.updateOne(query, updateSet, option)
}