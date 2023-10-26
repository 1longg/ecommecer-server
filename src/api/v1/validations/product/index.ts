import { BadRequestError } from '@cores/error.respsonse'
import { IRequestBodyCreateProduct } from '@interfaces/requestBody/requestBody.interface'
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

class validateRequestBody {
  static createProduct(req: Request & { body: IRequestBodyCreateProduct }, res: Response, next: NextFunction) {
    const schema = Joi.object({
      name: Joi.string().required().trim(),
      price: Joi.number().required().min(0),
      description: Joi.string().required().trim(),
      category: Joi.string().required().trim(),
      quantity: Joi.string().required().trim(),
      sold: Joi.number().required().min(0),
      rating: Joi.number().required().min(0),
      image: Joi.array().items(Joi.string().trim()).required(),
      attributes: Joi.object().required()
    })
    const validation = schema.validate(req.body)

    if (!validation.error) next()
    else {
      const message = validation.error.details.map((x) => x.message)[0]
      throw new BadRequestError(message)
    }
  }
}
export default validateRequestBody