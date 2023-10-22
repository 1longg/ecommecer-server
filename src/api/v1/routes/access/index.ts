import accessController from '@controllers/access.controller'
import { authenticationMiddleware } from '@middlewares/authentication'
import { asyncHandler } from '@utils/asyncHandler'
import validateRequestBody from '@validations/access'
import express from 'express'

const router = express.Router()

router.post('/signIn', validateRequestBody.signIn ,asyncHandler(accessController.signIn))
router.post('/', validateRequestBody.signUp ,asyncHandler(accessController.signUp))
router.post('/getNewAccessToken', validateRequestBody.getNewAccessToken ,asyncHandler(accessController.getNewAccessToken))
router.post('/logOut', authenticationMiddleware, asyncHandler(accessController.logOut))

module.exports = router