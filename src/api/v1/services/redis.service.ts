import { reservationInventory } from '@models/repositories/inventory.repo';
import mongoose from 'mongoose';
import { createClient } from 'redis';
import { promisify } from 'util';

const redisClient = createClient()
const pexpire = promisify(redisClient.pExpire).bind(redisClient)
const setAsync = promisify(redisClient.set).bind(redisClient)

export const acquireLock = async (cartId: mongoose.Types.ObjectId, productId: mongoose.Types.ObjectId, quantity: number) => {
    const key = `cart:${cartId}:product:${productId}`
    const retryCount = 10
    const expriedTime = 1000
    for (let index = 0; index < retryCount; index++) {
       const keyEx = setAsync(key, expriedTime, 'NX') 
       if(keyEx === '1'){
        const isReversation = await reservationInventory(cartId, productId, quantity) 
        if(isReversation.modifiedCount){
            await pexpire(key, expriedTime)
            return key
        }
        return null
       }
       else{
            await new Promise((resolve) => setTimeout(resolve, 50))
       }
    }
}

export const releaseLock = async (keyLock: string) => {
    const delAsyncKey = promisify(redisClient.del).bind(redisClient)
    return await delAsyncKey(keyLock)
}