import { IProductModel } from '@interfaces/model/product/productModel.interface'
import mongoose from 'mongoose'

const COLLECTION_NAME = 'products'
const MODEL_NAME = 'Product'

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    attributes: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
    belongTo: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['clothing', 'phone', 'electric'],
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    image: {
      type: [String],
    },
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
)

ProductSchema.index({ name: 'text', sold: -1, price: -1, createdAt: -1 }, { default_language: 'none'})

export default mongoose.model<IProductModel>(MODEL_NAME, ProductSchema)
