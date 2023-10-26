import { IElectricModel } from '@interfaces/model/product/electricModel.interface'
import mongoose from 'mongoose'

const COLLECTION_NAME = 'electrics'
const MODEL_NAME = 'Electric'

const ElectricModel = new mongoose.Schema(
  {
    brand: {
      type: String,
      required: true,
    },
    model: {
      type: [String],
      required: true,
    },
    shop: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
  },
  {
    collection: COLLECTION_NAME,
  },
)

export default mongoose.model<IElectricModel>(MODEL_NAME, ElectricModel)
