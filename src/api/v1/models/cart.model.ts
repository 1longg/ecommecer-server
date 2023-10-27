import mongoose from "mongoose";

const COLLECTION_NAME = 'carts'
const MODEL_NAME = 'Cart'

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        }
    }]
},
{
    collection: COLLECTION_NAME,
    timestamps: true
})

export default mongoose.model(MODEL_NAME, CartSchema)