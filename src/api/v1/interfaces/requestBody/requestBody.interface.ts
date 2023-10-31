import { ICartModelProducts } from "@interfaces/model/cartModel.interface"
import mongoose from "mongoose"

export interface IRequestBodySignIn {
    username: string,
    password: string
}

export interface IRequestBodySignUp {
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
} 

export interface IRequestBodyGetNewAccessToken {
    refreshToken: string
}

export interface IRequestBodyCreateProduct {
    name: string,
    price: number,
    description: [string],
    attributes: mongoose.Schema.Types.Mixed,
    belongTo: mongoose.Types.ObjectId,
    category: string,
    quantity: string,
    sold: number,
    rating: number,
    image: [string]
}

export interface IRequestClothingAttributes {
    size?: [string],
    brand?: string
}
export interface IRequestElectricAttributes {
    model?: [string],
    brand?: string
}
export interface IRequestPhoneAttributes {
    model?: [string],
    brand?: string
}
export interface IRequestBodyUpdateProduct {
    name?: string,
    price?: number,
    description?: [string],
    attributes?: IRequestClothingAttributes | IRequestElectricAttributes | IRequestPhoneAttributes,
    belongTo?: mongoose.Types.ObjectId,
    category?: string,
    quantity?: string,
    sold?: number,
    rating?: number,
    image?: [string]
}

export interface ICheckoutReview {
    cartId: mongoose.Types.ObjectId
    user: mongoose.Types.ObjectId
    product: [ICartModelProducts]
}

export interface IRequestBodyUpdateProfile{
    firstName?: string,
    lastName?: string,
    phoneNumber?: string,
}