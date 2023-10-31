import userModel from '@models/user.model'
import mongoose from 'mongoose'

import bcrypt from 'bcryptjs'
import { BadRequestError } from '@cores/error.respsonse'
import { IRequestBodyUpdateProduct } from '@interfaces/requestBody/requestBody.interface'
import { uploadImageToCloud } from '@utils/uploadToCloud'

class UserService {
  static changePassword = async (oldPassword: string, newPassword: string, _id: mongoose.Types.ObjectId) => {
    const user = await userModel.findById(_id)
    if (!user) throw new BadRequestError('User not found')
    const checkPassword = await bcrypt.compare(oldPassword, user.password)
    if (!checkPassword) throw new BadRequestError('Password is not correct')
    user.password = newPassword
    await user.save()
  }

  static updateProfile = async (_id: mongoose.Types.ObjectId, payload: IRequestBodyUpdateProduct) => {
    const user = await userModel.findById(_id)
    if (!user) throw new BadRequestError('User not found')
    const update = await userModel.findByIdAndUpdate(_id, payload, { new: true })
    return update
  }

  static updateAvartar = async (_id: mongoose.Types.ObjectId, image: string) => {
    const url = (await uploadImageToCloud(image)) as { url: string }
    const update = await userModel.findByIdAndUpdate(_id, { avatar: url.url }, { new: true })
    return update
  }
}

export default UserService
