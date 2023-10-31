import { BadRequestError } from '@cores/error.respsonse'
import productModel from '@models/product/product.model'
import { selectData, unSelectData } from '@utils/selectData'
import mongoose from 'mongoose'

export const getAllProduct = async (limit: number, page: number, select: string[]) => {
  const skip = (page - 1) * limit
  const products = await productModel.find().skip(skip).limit(limit).lean().select(selectData(select))
  if (!products) throw new BadRequestError('Some thing wrongs!!!')
  return {products, count: products.length}
}

export const getSingleProduct = async (_id: string, unSelect: string[]) => {
  const product = await productModel
    .findById(_id)
    .populate('belongTo', 'username email')
    .lean()
    .select(unSelectData(unSelect))
    .exec()
  if (!product) throw new BadRequestError('Some thing wrongs!!!')
  return product
}

export const getProductsBySearch = async (searchText: string, sortBy: string, order: string) => {
  const products = await productModel
    .find({ $text: { $search: searchText } }, { score: { $meta: 'textScore' } })
    .sort({[sortBy]: order === "desc" ? -1 : 1})
    .lean()
  if (!products) throw new BadRequestError('Some thing wrongs!!!')
  return {products, count: products.length}
}

export const getProductsByFilter = async (category: string, sortBy: string, order: string) => {
  console.log(category, sortBy, order)
  const products = await productModel
    .find({ category: category })
    .sort({[sortBy]: order === "desc" ? -1 : 1})
    .lean()
  return {products, count: products.length}
}

export const checkProductByServer = async (productId: mongoose.Types.ObjectId) => {
    const product = await productModel.findById(productId)
    if(!product) throw new BadRequestError('Not found product')
    return {
      price: product.price,
      name: product.name,
      quantity: product.quantity
  }
}