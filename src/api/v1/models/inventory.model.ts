import mongoose from "mongoose";

const COLLECTION_NAME = 'inventories'
const MODEL_NAME = 'Inventory'

const InventorySchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    inStock: {
        type: Number,
        required: true,
        default: 0
    },
    reservation: [{
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Cart',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        reservedAt: {
            type: Date,
            required: true,
            default: Date.now
        }
    }]
},
{
    collection: COLLECTION_NAME,
    timestamps: true
})

export default mongoose.model(MODEL_NAME, InventorySchema)