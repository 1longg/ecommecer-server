import productController from '@controllers/product.controller'
import { authenticationMiddleware } from '@middlewares/authentication'
import { asyncHandler } from '@helpers/asyncHandler'
import validateProductRequestBody from '@validations/product'
import express from 'express'

const router = express.Router()

router.post(
  '/',
  authenticationMiddleware,
  validateProductRequestBody.createProduct,
  asyncHandler(productController.createProduct),
)
router.get('/', asyncHandler(productController.getAllProduct))
router.get('/search', asyncHandler(productController.getProductsBySearch))
router.get('/filter', asyncHandler(productController.getProductsByFilter))
router.get('/:productId', asyncHandler(productController.getSingleProduct))
router.patch('/:productId', authenticationMiddleware, asyncHandler(productController.updateProduct))

module.exports = router
