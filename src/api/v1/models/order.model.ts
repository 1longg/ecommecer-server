import mongoose from 'mongoose'

const COLLECTION_NAME = 'orders'
const MODEL_NAME = 'Order'

const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    orderCheckout: {
      totalPrice: {
        type: Number,
        required: true,
      },
      totalProduct: {
        type: Number,
        required: true,
      },
    },
  },
  {
    collection: COLLECTION_NAME,
    timestamps: true,
  },
)

export default mongoose.model(MODEL_NAME, OrderSchema)
