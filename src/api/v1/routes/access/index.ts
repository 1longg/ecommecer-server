import accessController from '@controllers/access.controller'
import { authenticationMiddleware } from '@middlewares/authentication'
import { asyncHandler } from '@helpers/asyncHandler'
import validateAccessRequestBody from '@validations/access'
import express from 'express'

const router = express.Router()

router.post('/signIn', validateAccessRequestBody.signIn, asyncHandler(accessController.signIn))
router.post('/', validateAccessRequestBody.signUp, asyncHandler(accessController.signUp))
router.post(
  '/getNewAccessToken',
  validateAccessRequestBody.getNewAccessToken,
  asyncHandler(accessController.getNewAccessToken),
)
router.post('/logOut', authenticationMiddleware, asyncHandler(accessController.logOut))

module.exports = router
