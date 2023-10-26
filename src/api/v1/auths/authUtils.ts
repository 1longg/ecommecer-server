import { ForbidenError } from '@cores/error.respsonse'
import jwt from 'jsonwebtoken'
import { IJwtPayLoad } from 'types/jwtPayLoad'
import keyToken from '@models/keyToken.model'

export const checkExpiredRefreshToken = async (token: string, privateKey: string) => {
  /*
        1. get userId form header and get private key to decode token
        2. decode token
        3. return
    */
  try {
    return jwt.verify(token, privateKey) as IJwtPayLoad
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      await keyToken.deleteOne({ refreshToken: token }) 
      throw new ForbidenError('Token expired please login again')
    }
    throw new Error(error.message)
  }
}

export const checkExpiredAccessToken = (token: string, publicKey: string) => {
  try {
    const decode = jwt.verify(token, publicKey) as IJwtPayLoad
    return decode
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new ForbidenError('Token expired')
    }
    throw new Error(error.message)
  }
}
