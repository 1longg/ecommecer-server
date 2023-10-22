import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

import { IRequestBodyGetNewAccessToken, IRequestBodySignIn, IRequestBodySignUp } from '@interfaces/requestBody/requestBody.interface'
import { ForbidenError } from '@cores/error.respsonse'

class validateRequestBody {
  static signIn(req: Request & { body: IRequestBodySignIn }, res: Response, next: NextFunction) {
    const schema = Joi.object({
      username: Joi.string().required().trim(),
      password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
    })
    const validation = schema.validate(req.body)
    if (!validation.error) next()
    else {
      const message = validation.error.details.map((x) => x.message)[0]
      throw new ForbidenError(message)
    }
  }

  static signUp(req: Request & { body: IRequestBodySignUp }, res: Response, next: NextFunction) {
    const schema = Joi.object({
      username: Joi.string().required().trim(),
      password: Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),
      email: Joi.string().required().email(),
      firstName: Joi.string().required().trim(),
      lastName: Joi.string().required().trim(),
    })

    const validation = schema.validate(req.body)
    if (!validation.error) next()
    else {
      const message = validation.error.details.map((x) => x.message)[0]
      throw new ForbidenError(message)
    }
  }

  static getNewAccessToken(req: Request & {body: IRequestBodyGetNewAccessToken}, res: Response, next: NextFunction) {
    const schema = Joi.object({
      refreshToken: Joi.string().required().trim(),
    })

    const validation = schema.validate(req.body)
    if(!validation.error) next()
    else {
      const message = validation.error.details.map((x) => x.message)[0]
      throw new ForbidenError(message)
    }
  }
}

export default validateRequestBody
