import mongoose from "mongoose";

const COLLECTION_NAME = 'checkouts'
const MODEL_NAME = 'Checkout'


const CheckoutSchema = new mongoose.Schema({
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cart',   
        required: true
    },
    userId: {
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

export default mongoose.model(MODEL_NAME, CheckoutSchema)
