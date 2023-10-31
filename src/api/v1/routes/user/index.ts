import { authenticationMiddleware } from '@middlewares/authentication'
import { asyncHandler } from '@helpers/asyncHandler'
import express from 'express'
import userController from '@controllers/user.controller'
import { upload } from '@utils/multer'

const router = express.Router()

router.post('/changePassword', authenticationMiddleware, asyncHandler(userController.changePassword))
router.post(
  '/updateAvatar',
  authenticationMiddleware,
  upload.single('avatar'),
  asyncHandler(userController.updateAvartar),
)
router.post('/updateProfile', authenticationMiddleware, asyncHandler(userController.updateProfile))

module.exports = router
