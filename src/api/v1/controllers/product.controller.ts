
import { Request, Response } from 'express'
import { OK } from '@cores/success.response'
import ProductService from '@services/product.service'

class ProductController {
  async createProduct(req: Request, res: Response) {
    new OK({
      message: 'Create product successfully',
      metadata: await ProductService.createProduct(req.body.category, req.body, req.user._id)
    }).send(res)
  }
  async getAllProduct(req: Request, res: Response) {
    new OK({
      message: 'Get all product successfully',
      metadata: await ProductService.getAllProduct(req.query.limit as string, req.query.page as string)
    }).send(res)
  }

  async getSingleProduct(req: Request, res: Response) {
    new OK({
      message: 'Get single product successfully',
      metadata: await ProductService.getSingleProduct(req.params.productId)
    }).send(res)
  }

  async getProductsBySearch(req: Request, res: Response) {
    new OK({
      message: 'Get product successfully',
      metadata: await ProductService.getProductsBySearch(req.query.searchText as string, req.query.sortBy as string, req.query.order as string)
    }).send(res)
  }

  async getProductsByFilter(req: Request, res: Response) {
    new OK({
      message: 'Get product successfully',
      metadata: await ProductService.getProductsByFilter(req.query.category as string, req.query.sortBy as string, req.query.order as string)
    }).send(res)
  }

  async updateProduct(req: Request, res: Response) {
    new OK({
      message: 'Update product successfully',
      metadata: await ProductService.updateProduct(req.params.productId, req.body.category ,req.body)
    }).send(res)
  }
}

export default new ProductController()