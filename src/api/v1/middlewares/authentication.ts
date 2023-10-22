import { checkExpiredAccessToken } from '@auths/authUtils'
import { ForbidenError } from '@cores/error.respsonse'
import keyToken from '@models/keyToken.model'
import { Request, Response, NextFunction } from 'express'

export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization.split(' ')[1]
  if (!accessToken) throw new ForbidenError('Access token is required')
  const userId = req.headers['x-client-id']
  if (!userId) throw new ForbidenError('userId is required')
  const { publicKey } = await keyToken.findOne({ user: userId })

  try {
    checkExpiredAccessToken(accessToken, publicKey)
    next()
  } catch (error) {
    next(error)
  }
}
