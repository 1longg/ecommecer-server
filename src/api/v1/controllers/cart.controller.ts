import { Request, Response } from 'express'
import { OK } from '@cores/success.response'
import CartService from '@services/cart.service'
import mongoose from 'mongoose'

class CartController {
    async addItemsToCart(req: Request, res: Response) {
        new OK({
            message: "Update cart successfully",
            metadata: await CartService.addItemsToCart(new mongoose.Types.ObjectId(req.headers['x-client-id'] as string), req.body.product, req.body.quantity)
        }).send(res)
    } 

    async getItemsInCart(req: Request, res: Response) {
        new OK({
            message: "Get items in cart successfully",
            metadata: await CartService.getItemsInCart(req.headers['x-client-id'] as string)
        }).send(res)
    } 

    async removeItemsInCart(req: Request, res: Response) {
        new OK({
            message: "Delete items in cart successfully",
            metadata: await CartService.removeItemsInCart(req.headers['x-client-id'] as string, req.body.product)
        }).send(res)
    }

}

export default new CartController()

