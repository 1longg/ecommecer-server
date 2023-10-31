import { Request, Response } from 'express'
import { OK } from '@cores/success.response'
import mongoose from 'mongoose'
import UserService from '@services/user.service'

class UserController {
  async changePassword(req: Request, res: Response) {
    new OK({
      message: 'Update passwrod successfully',
      metadata: await UserService.changePassword(
        req.body.oldPassword,
        req.body.oldPassword,
        new mongoose.Types.ObjectId(req.headers['x-client-id'] as string),
      ),
    }).send(res)
  }
  async updateProfile(req: Request, res: Response) {
    new OK({
      message: 'Update Profile successfully',
      metadata: await UserService.updateProfile(
        new mongoose.Types.ObjectId(req.headers['x-client-id'] as string),
        req.body,
      ),
    }).send(res)
  }
  async updateAvartar(req: Request, res: Response) {
    console.log(req.file.path)
    new OK({
      message: 'Update avatar successfully',
      metadata: await UserService.updateAvartar(
        new mongoose.Types.ObjectId(req.headers['x-client-id'] as string),
        req.file.path,
      ),
    }).send(res)
  }
}

export default new UserController()
