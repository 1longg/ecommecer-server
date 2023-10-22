import crypto from 'node:crypto'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import keyToken from '@models/keyToken.model'


class keyTokenService {
  static createKeyPair() {
    const privateKey = crypto.randomBytes(32).toString('hex')
    const publicKey = crypto.randomBytes(32).toString('hex')
    return { privateKey, publicKey }
  }
  static generateAccessToken(payload: {_id: mongoose.Types.ObjectId, email: string}, publicKey: string) {
    try {
      const accessToken = jwt.sign(payload, publicKey, { expiresIn: '10s' })
      return accessToken
    } catch (error) {
      console.log(error)
    }
  }
  static generateRefreshToken(payload: {_id: mongoose.Types.ObjectId, email: string}, privateKey: string) {
    try {
      const refreshToken = jwt.sign(payload, privateKey, { expiresIn: '3days' })
      return  refreshToken 
    } catch (error) {
      console.log(error)
    }
  }
  static async createKeyToken(_id: mongoose.Types.ObjectId, refreshToken: string, publicKey: string, privateKey: string){
    return await keyToken.create({user: _id, refreshToken, publicKey, privateKey})
  }
}

export default keyTokenService
