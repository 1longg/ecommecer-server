import { authenticationMiddleware } from '@middlewares/authentication'
import { asyncHandler } from '@helpers/asyncHandler'
import express from 'express'
import cartController from '@controllers/cart.controller'

const router = express.Router()

router.get('/', authenticationMiddleware, asyncHandler(cartController.getItemsInCart))
router.post('/', authenticationMiddleware, asyncHandler(cartController.addItemsToCart))
router.delete('/', authenticationMiddleware, asyncHandler(cartController.removeItemsInCart))

module.exports = router

