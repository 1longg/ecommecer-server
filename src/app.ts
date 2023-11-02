import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import { NextFunction, Request, Response } from 'express'

import instanceMongoDb from '@db/init.mongo'
import { ErrorResponse, NotFoundError } from '@cores/error.respsonse'


const app = express()

//init middlewares
app.use(morgan('dev'))
app.use(helmet())
app.use(compression())
app.use(express.json())


//init db
instanceMongoDb

//init routes

app.use('/api/v1/auth', require('@routes/access/index'))
app.use('/api/v1/products', require('@routes/product/index'))
app.use('/api/v1/carts', require('@routes/cart/index'))
app.use('/api/v1/checkouts', require('@routes/checkout/index'))
app.use('/api/v1/users', require('@routes/user/index'))
app.use('/api/v1/comments', require('@routes/comment/index'))
//handleErros

app.use((_req: Request, _res: Response, next: NextFunction) => {
    const error = new NotFoundError('Not found')
    next(error)
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: ErrorResponse, _req: Request, res: Response, next: NextFunction) => {
    const status = error.status || 500
    const message = error.message || 'Internal server error'
    return res.status(status).json({
        status: 'error',
        code: status,
        message
    })
})


export default app
