import { Request, Response } from 'express'
import { OK } from '@cores/success.response'
import mongoose from 'mongoose'
import CheckoutService from '@services/checkout.service'

class CheckoutController {
    async checkoutReview(req: Request, res: Response) {
        new OK({
            message: "Update cart successfully",
            metadata: await CheckoutService.checkoutReview(req.body.cartId,new mongoose.Types.ObjectId(req.headers['x-client-id'] as string), req.body.products)
        }).send(res)
    } 

}

export default new CheckoutController()

