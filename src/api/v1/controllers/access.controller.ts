import accessService from '@services/access.service'
import { Request, Response } from 'express'
import { CREATED, OK } from '@cores/success.response'

class AccessController {
  signIn = async (req: Request, res: Response) => {
    new OK({
      message: 'Sign in successfully',
      metadata: await accessService.signIn(req.body),
    }).send(res)
  }
  signUp = async (req: Request, res: Response) => {
    new CREATED({
      message: 'Sign up successfully',
      metadata: await accessService.signUp(req.body),
    }).send(res)
  }
  logOut = async (req: Request, res: Response) => {
    new OK({
      message: 'Log out successfully',
      metadata: await accessService.logOut(req.headers['x-client-id'] as string),
    }).send(res)
  }
  getNewAccessToken = async (req: Request, res: Response) => {
    new OK({
      message: 'Get new access token successfully',
      metadata: await accessService.getNewAccessToken(req.body.refreshToken, req.headers['x-client-id'] as string),
    }).send(res)
  }
}

export default new AccessController()
