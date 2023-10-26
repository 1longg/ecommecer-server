import bcrypt from 'bcryptjs'

import { ForbidenError } from '@cores/error.respsonse'
import { IRequestBodySignIn, IRequestBodySignUp } from '@interfaces/requestBody/requestBody.interface'
import User from '@models/user.model'
import keyTokenService from './keyToken.service'
import { getInfoData } from '@utils/getInfoData'
import keyToken from '@models/keyToken.model'
import { checkExpiredRefreshToken } from '@auths/authUtils'

class AccessService {
  signIn = async (data: IRequestBodySignIn) => {
    const user = await User.findOne({ username: data.username })
    if (!user) throw new ForbidenError('Invalid username')

    const comparePassword = await bcrypt.compare(data.password, user.password)
    if (!comparePassword) throw new ForbidenError('Invalid password')

    const keyStore = keyTokenService.createKeyPair()
    if (!keyStore) throw new ForbidenError('Invalid key store')

    const refreshToken = keyTokenService.generateRefreshToken({ _id: user._id, email: user.email }, keyStore.privateKey)
    const accessToken = keyTokenService.generateAccessToken({ _id: user._id, email: user.email }, keyStore.publicKey)
    if (!refreshToken || !accessToken) throw new ForbidenError('Invalid token')

    const keyToken = await keyTokenService.createKeyToken(
      user._id,
      refreshToken,
      keyStore.publicKey,
      keyStore.privateKey,
    )
    if (!keyToken) throw new ForbidenError('Invalid key token')
    return {
      user: getInfoData(['_id', 'username', 'email'], user),
      accessToken,
      refreshToken,
    }
  }

  signUp = async (data: IRequestBodySignUp) => {
    const isEmailExist = await User.findOne({ email: data.email })
    if (isEmailExist) throw new ForbidenError('Email already exist')
    const user = await User.create(data)
    return getInfoData(['_id', 'username', 'email', 'firstName', 'lastName'], user)
  }

  getNewAccessToken = async (refreshToken: string, userId: string) => {
    const keyStore = await keyToken.findOne({ user: userId })
    if (!keyStore) throw new ForbidenError('Invalid key store')
    const decode = await checkExpiredRefreshToken(refreshToken, keyStore.privateKey)
    const accessToken =  keyTokenService.generateAccessToken({_id: decode._id, email: decode.email}, keyStore.publicKey)
    return accessToken
  }

  logOut = async (userId: string) => {
    const deleteToken = await keyToken.deleteOne({ user: userId })
    if(!deleteToken) throw new ForbidenError('Delete token failed')
    return deleteToken
  }
}

export default new AccessService()
