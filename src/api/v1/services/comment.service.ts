import { BadRequestError } from '@cores/error.respsonse'
import commentModel from '@models/comment.model'
import productModel from '@models/product/product.model'
import mongoose from 'mongoose'

class CommentService {
  async createComment(
    productId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    content: string,
    parrentId: mongoose.Types.ObjectId = null,
  ) {
    const product = await productModel.findById(productId)
    if (!product) throw new BadRequestError('Product not found')

    let rightvalue
    if (parrentId) {
      const commentParrent = await commentModel.findById(parrentId)
      if (!commentParrent) throw new BadRequestError('Comment parrent not found')
      rightvalue = commentParrent.right
      await commentModel.updateMany({ right: { $gte: commentParrent.right } }, { $inc: { right: 2 } })
      await commentModel.updateMany({ left: { $gte: commentParrent.right } }, { $inc: { left: 2 } })
      const newComment = await commentModel.create({
        productId,
        userId,
        content,
        left: rightvalue,
        right: rightvalue + 1,
        parrentId,
      })
      if (!newComment) throw new BadRequestError('Create comment failed')
      return newComment
    } else {
      const commentMaxRight = await commentModel.findOne({ productId }).sort({ right: -1 })
      if (commentMaxRight) {
        rightvalue = commentMaxRight.right + 1
      } else {
        rightvalue = 1
      }
      const newComment = await commentModel.create({
        productId,
        userId,
        content,
        right: rightvalue + 1,
        left: rightvalue,
        parrentId,
      })
      if (!newComment) throw new BadRequestError('Create comment failed')
      return newComment
    }
  }
  async getComment(productId: mongoose.Types.ObjectId, parrentId: mongoose.Types.ObjectId = null) {
    if (parrentId) {
      const parrentComment = await commentModel.findOne(parrentId)
      if (!parrentComment) throw new BadRequestError('Comment parrent not found')
      const comment = await commentModel.find({
        productId,
        parrentId,
        left: { $gte: parrentComment.left },
        right: { $lte: parrentComment.right },
      })
      return comment
    }

    const comment = await commentModel.find({ productId, parrentId })
    return comment
  }

  async deleteComment(productId: mongoose.Types.ObjectId, commentId: mongoose.Types.ObjectId) {
    const commentToDelete = await commentModel.findOne({ productId, _id: commentId })
    if (!commentToDelete) throw new BadRequestError('Comment not found')
    const deleteLeft = commentToDelete.left
    const deleteRight = commentToDelete.right
    const width = commentToDelete.right - commentToDelete.left + 1
    await commentModel.deleteMany({ left: { $gte: deleteLeft }, right: { $lte: deleteRight } })
    await commentModel.updateMany({ right: { $gte: deleteRight } }, { $inc: { right: -width } })
    await commentModel.updateMany({ left: { $gte: deleteLeft } }, { $inc: { left: -width } })
    return 'success'
  }
}

export default new CommentService()
