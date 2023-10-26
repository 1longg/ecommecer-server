import { IClothingModel } from '@interfaces/model/product/clothingModel.interface'
import mongoose from 'mongoose'

const COLLECTION_NAME = 'clothings'
const MODEL_NAME = 'Clothing'

const ClothingModel = new mongoose.Schema(
  {
    size: {
      type: String,
      required: true,
      enum: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    brand: {
      type: String,
      required: true,
    },

    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
    },
  },
  {
    collection: COLLECTION_NAME,
  },
)

export default mongoose.model<IClothingModel>(MODEL_NAME, ClothingModel)
