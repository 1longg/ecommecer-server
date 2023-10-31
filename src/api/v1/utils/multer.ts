import multer from 'multer'
import { Request } from 'express'
import path from 'path'

type DestinationCallback = (error: Error | null, destination: string) => void
type FilenameCallback = (error: Error | null, filename: string) => void

const store = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback) => {
    cb(null, './src/api/v1/Images')
  },
  filename: (req: Request, file: Express.Multer.File, cb: FilenameCallback) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

export const upload = multer({
  storage: store
})

