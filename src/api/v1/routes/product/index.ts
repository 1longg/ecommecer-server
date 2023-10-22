
import productController from '@controllers/product.controller'
import { authenticationMiddleware } from '@middlewares/authentication'
import { asyncHandler } from '@utils/asyncHandler'
import express from 'express'

const router = express.Router()

router.get('/', authenticationMiddleware ,asyncHandler(productController.getAllProducts))

module.exports = router