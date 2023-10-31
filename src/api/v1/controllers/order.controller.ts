import { Request, Response } from 'express'
import { OK } from '@cores/success.response'
import orderModel from '@models/order.model'

class OrderController {
    async getOrder(req: Request, res: Response) {
        new OK({
            message: "Get order successfully",
            metadata: await orderModel.findOne({ _id: req.headers['x-client-id'] as string })
        }).send(res)
    } 

}

export default new OrderController()


