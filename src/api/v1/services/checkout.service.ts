import { BadRequestError } from '@cores/error.respsonse'
import { ICartModelProducts } from '@interfaces/model/cartModel.interface'
import cartModel from '@models/cart.model'
import { checkProductByServer } from '@models/repositories/product.repo'
import mongoose from 'mongoose'
import { acquireLock, releaseLock } from './redis.service'
import orderModel from '@models/order.model'
import CartService from './cart.service'

class CheckoutService {
  async checkoutReview(
    cartId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    products: [ICartModelProducts],
  ) {
    const cart = await cartModel.findOne({ _id: cartId })
    if (!cart) throw new BadRequestError('Cart not found')
    const checkout_order = {
      totalPrice: 0,
      totalProduct: 0,
    }
    for (let i = 0; i < products.length; i++) {
      const product = await checkProductByServer(products[i].product)
      checkout_order.totalPrice += product.price
      checkout_order.totalProduct += product.quantity
    }
    return {
      checkout_order,
    }
  }

  async checkoutOrder(
    cartId: mongoose.Types.ObjectId,
    userId: mongoose.Types.ObjectId,
    products: [ICartModelProducts],
  ) {
    const { checkout_order } = await this.checkoutReview(cartId, userId, products)
    const acquireProduct = []
    for (let index = 0; index < products.length; index++) {
      const keyLock = await acquireLock(cartId, products[index].product, products[index].quantity)
      acquireProduct.push(keyLock ? true : false)
      if (keyLock) await releaseLock(keyLock)
    }
    if (acquireProduct.includes(false)) {
      throw new BadRequestError('Some Product has been sold out! Please try again')
    }
    const order = await orderModel.create({
      userId,
      products,
      orderCheckout: checkout_order,
    })
    if (!order) throw new BadRequestError('Order failed')
    //remove order incart
    for (let index = 0; index < products.length; index++) {
        await CartService.updateProductQuantity(userId, products[index].product, products[index].quantity)
    }
    return order
  }
}

export default new CheckoutService()
