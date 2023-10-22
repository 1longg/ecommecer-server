
import { Request, Response } from 'express'
import { OK } from '@cores/success.response'
import ProductService from '@services/product.service'

class ProductController {
  getAllProducts = async (req: Request, res: Response) => {
    new OK({
      message: 'Get all products successfully',
      metadata: await ProductService.getAllProducts(),
    }).send(res)
  }
}

export default new ProductController()