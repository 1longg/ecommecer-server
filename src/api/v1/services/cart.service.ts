import { BadRequestError } from '@cores/error.respsonse'
import Cart from '@models/cart.model'
import mongoose from 'mongoose'

class CartService {
  static async createCart(
    userId: mongoose.Types.ObjectId | string,
    product: mongoose.Types.ObjectId | string,
    quantity: number,
  ) {
    const query = { user: userId },
      updateOrInsert = {
        $addToSet: {
          products: { product, quantity },
        },
      },
      options = { upsert: true, new: true, setDefaultsOnInsert: true }
    const cart = await Cart.findOneAndUpdate(query, updateOrInsert, options)

    if (!cart) throw new BadRequestError('Create cart failed')
    return cart
  }

  static async updateProductQuantity(
    userId: mongoose.Types.ObjectId,
    product: mongoose.Types.ObjectId,
    quantity: number,
  ) {
    const isProductExist = await Cart.findOne({ user: userId, 'products.product': product })
    if (isProductExist) {
      const query = { user: userId, 'products.product': product },
        updateSet = {
          $inc: {
            'products.$.quantity': quantity,
          },
        },
        options = { upsert: true, new: true }
      return await Cart.findOneAndUpdate(query, updateSet, options)
    }

    const query = { user: userId },
      updateSet = {
        $push: {
          products: { product, quantity },
        },
      },
      options = { upsert: true, new: true }

    return await Cart.findOneAndUpdate(query, updateSet, options)
  }

  static async addItemsToCart(userId: mongoose.Types.ObjectId, product: mongoose.Types.ObjectId, quantity: number) {
    // add items to cart
    const isExitsProductInCart = await Cart.findOne({ user: userId })
    if (!isExitsProductInCart) {
      const cart = await this.createCart(userId, product, quantity)
      return cart
    }
    if (!isExitsProductInCart.products.length) {
      isExitsProductInCart.products.push({ product, quantity })
      return await isExitsProductInCart.save()
    }
    isExitsProductInCart.products.map(async (item) => {
      if (item.product === product) {
        return await isExitsProductInCart.save()
      }
    })
    const prouduct = await CartService.updateProductQuantity(userId, product, quantity)
    return prouduct
  }

  static async getItemsInCart(userId: mongoose.Types.ObjectId | string) {
    const cart =  await Cart.findOne({ user: userId }).populate('products.product', 'name price image')
    if (!cart) throw new BadRequestError('No items in cart')
    return cart
  }

  static async removeItemsInCart(userId: mongoose.Types.ObjectId | string, product: mongoose.Types.ObjectId) {
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      {
        $pull: {
          products: { product },
        },
      },
      { new: true },
    )
    if (!cart) throw new BadRequestError('Remove item failed')
    return cart
  }
}

export default CartService
