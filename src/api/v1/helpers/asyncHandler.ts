import { NextFunction, Request, Response } from 'express'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const asyncHandler = (fn: any) => (req: Request, res: Response, next: NextFunction) =>   fn(req, res, next).catch(next);