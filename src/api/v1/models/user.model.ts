import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'
import { IUserModel } from '@interfaces/model/userModel.interface'

const COLLECTION_NAME = 'users'
const MODEL_NAME = 'User'

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    username: {
      type: String,
      require: true,
      unique: true,
    },
    firstName: {
      type: String,
      require: true,
    },
    lastName: {
      type: String,
      require: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
  },
  {
    timestamps: true,
    collection: COLLECTION_NAME,
  },
)

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const hashedPassword = await bcrypt.hash(this.password, 10)
  this.password = hashedPassword
})

export default mongoose.model<IUserModel>(MODEL_NAME, userSchema)
