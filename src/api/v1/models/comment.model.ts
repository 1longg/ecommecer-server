import mongoose from "mongoose";

const COLLECTION_NAME = 'comments'
const MODEL_NAME = 'Comment'

const CommentSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    right: {
        type: Number,
        required: true
    },
    left: {
        type: Number,
        required: true
    },
    parrentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        required: false
    },
    content: {
        type: String,
        required: true
    },
},
{
    collection: COLLECTION_NAME,
    timestamps: true
})

export default mongoose.model(MODEL_NAME, CommentSchema)