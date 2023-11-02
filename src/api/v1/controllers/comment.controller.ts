import { Request, Response } from 'express'
import { OK } from '@cores/success.response'
import mongoose from 'mongoose'
import commentService from '@services/comment.service'

class CommentController {
  async createComment(req: Request, res: Response) {
    new OK({
      message: 'Comment successfully',
      metadata: await commentService.createComment(
        req.body.productId,
        new mongoose.Types.ObjectId(req.headers['x-client-id'] as string),
        req.body.content,
        req.body.parrentId ? new mongoose.Types.ObjectId(req.body.parrentId) : null,
      ),
    }).send(res)
  }
  async getComment(req: Request, res: Response) {
    new OK({
      message: 'Get comment successfully',
      metadata: await commentService.getComment(
        req.body.productId,
        req.body.parrentId ? new mongoose.Types.ObjectId(req.body.parrentId) : null,
      ),
    }).send(res)
  }
  async deleteComment(req: Request, res: Response) {
    new OK({
      message: 'Delete comment successfully',
      metadata: await commentService.deleteComment(req.body.productId, new mongoose.Types.ObjectId(req.body.commentId)),
    }).send(res)
  }
}

export default new CommentController()
