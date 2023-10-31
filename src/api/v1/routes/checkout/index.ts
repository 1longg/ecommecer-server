import { authenticationMiddleware } from '@middlewares/authentication'
import { asyncHandler } from '@helpers/asyncHandler'
import express from 'express'
import checkoutController from '@controllers/checkout.controller'

const router = express.Router()

router.post('/review', authenticationMiddleware, asyncHandler(checkoutController.checkoutReview))

module.exports = router

