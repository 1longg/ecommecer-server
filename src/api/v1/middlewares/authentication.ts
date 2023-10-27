import { checkExpiredAccessToken } from '@auths/authUtils'
import { ForbidenError } from '@cores/error.respsonse'
import keyToken from '@models/keyToken.model'
import { Request, Response, NextFunction } from 'express'

export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1]
    if (!accessToken) throw new ForbidenError('Access token is required')
    const userId = req.headers['x-client-id']
    if (!userId) throw new ForbidenError('userId is required')
    const { publicKey } = await keyToken.findOne({ user: userId })
    const user = checkExpiredAccessToken(accessToken, publicKey)
    if (user._id !== userId) throw new ForbidenError('Invalid userId')
    req.user = user
    next()
  } catch (error) {
    console.log(error)
    next(error)
  }
}
