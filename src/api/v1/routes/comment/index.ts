import { authenticationMiddleware } from '@middlewares/authentication'
import { asyncHandler } from '@helpers/asyncHandler'
import express from 'express'
import commentController from '@controllers/comment.controller'

const router = express.Router()

router.post('/', authenticationMiddleware, asyncHandler(commentController.createComment))
router.get('/', authenticationMiddleware, asyncHandler(commentController.getComment))
router.delete('/', authenticationMiddleware, asyncHandler(commentController.deleteComment))

module.exports = router


