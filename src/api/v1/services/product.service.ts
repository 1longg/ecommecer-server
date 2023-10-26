import { BadRequestError } from "@cores/error.respsonse"
import { IRequestBodyCreateProduct, IRequestBodyUpdateProduct } from "@interfaces/requestBody/requestBody.interface"
import clothingModel from "@models/product/clothing.model"
import electricModel from "@models/product/electric.model"
import phoneModel from "@models/product/phone.model"
import productModel from "@models/product/product.model"
import { getAllProduct, getProductsByFilter, getProductsBySearch, getSingleProduct } from "@models/repositories/product.repo"
import { removeNullData, updateNestedObjectParser } from "@utils/removeNullData"
import mongoose from "mongoose"

class ProductFactory {
    static listClass = {} //key-pair

    static setListClass(type: string, classRef: unknown){
        ProductFactory.listClass[type] = classRef
    }

    static async createProduct(type: string, payload: IRequestBodyCreateProduct, belongTo: mongoose.Types.ObjectId | string ) {
        const productClass = ProductFactory.listClass[type]
        const product = new productClass(payload.name, payload.price, payload.description, payload.attributes, belongTo, payload.category, payload.quantity, payload.sold, payload.rating, payload.image)
        if(!product) throw new BadRequestError(
            `Invalid type ${type}`
        )
        return await product.createProduct()
    }

    static async getAllProduct(limit: string, page: string, select: string[] = ['name','price', 'image', 'sold', 'rating']){
        const {products, count} = await getAllProduct(Number(limit), Number(page), select)
        return {products, count}
    }

    static async getSingleProduct(_id: string, unSelect: string[] = ['__v', 'createdAt', 'updatedAt']){
        const product = await getSingleProduct(_id, unSelect)
        return product
    }

    static async getProductsBySearch(searchText: string, sortBy: string, order: string) {
       return await getProductsBySearch(searchText, sortBy, order) 
    }

    static async getProductsByFilter(category: string, sortBy: string, order: string){
        return await getProductsByFilter(category, sortBy, order)
    }

    static async updateProduct(_id: string, type: string, payload: IRequestBodyUpdateProduct){
        const productClass = ProductFactory.listClass[type]
        return new productClass().updateProduct(_id, removeNullData(payload))
    }

}

class Product {
    name: string
    price: number
    description: string[]
    atributes: mongoose.Schema.Types.Mixed
    category: string
    belongTo: mongoose.Types.ObjectId
    quantity: string
    sold: number
    rating: number
    image: string[]
    constructor(name: string, price: number, description: [string], atributes: mongoose.Schema.Types.Mixed, belongTo: mongoose.Types.ObjectId, category: string, quantity: string, sold: number, rating: number, image: [string]){
        this.name = name
        this.price = price
        this.description = description
        this.atributes = atributes
        this.belongTo = belongTo
        this.category = category
        this.quantity = quantity
        this.sold = sold
        this.rating = rating
        this.image = image
    }
    async createProduct(_id: mongoose.Types.ObjectId){
        const product = await productModel.create({...this, _id})
        return product
    }
    async updateProduct(_id: mongoose.Types.ObjectId | string ,objectParams: IRequestBodyUpdateProduct){
        console.log(objectParams)
        const updateProduct = await productModel.updateOne({_id: _id}, objectParams)
        return updateProduct
    }
}

class Clothing extends Product {
    async createProduct(){
        const clothing = await clothingModel.create({...this.atributes, shop:this.belongTo})
        if(!clothing) throw new BadRequestError('Create clothing failed')
        const newProduct = await super.createProduct(clothing._id)
        if(!newProduct) throw new BadRequestError('Create product failed')
        return newProduct
    }
    async updateProduct(_id: mongoose.Types.ObjectId | string, payload: IRequestBodyUpdateProduct){
        if(payload.attributes){
            await clothingModel.updateOne({_id: _id}, updateNestedObjectParser(payload.attributes))
        }
        return await super.updateProduct(_id, payload)
    }
}
class Phone extends Product {
    async createProduct(){
        const phone = await phoneModel.create({...this.atributes, shop:this.belongTo})
        if(!phone) throw new BadRequestError('Create phone failed')
        const newProduct = await super.createProduct(phone._id)
        if(!newProduct) throw new BadRequestError('Create product failed')
        return newProduct
    }
    async updateProduct(_id: mongoose.Types.ObjectId | string, payload: IRequestBodyUpdateProduct){
        if(payload.attributes){
            await clothingModel.updateOne({_id: _id}, updateNestedObjectParser(payload.attributes))
        }
        return await super.updateProduct(_id, payload)
    }
}

class Electric extends Product {
    async createProduct(){
        const electric = await electricModel.create({...this.atributes, shop:this.belongTo})
        if(!electric) throw new BadRequestError('Create electric failed')
        const newProduct = await super.createProduct(electric._id)
        if(!newProduct) throw new BadRequestError('Create product failed')
        return newProduct
    }
    async updateProduct(_id: mongoose.Types.ObjectId | string, payload: IRequestBodyUpdateProduct){
        if(payload.attributes){
            await clothingModel.updateOne({_id: _id}, updateNestedObjectParser(payload.attributes))
        }
        return await super.updateProduct(_id, payload)
    }
}

ProductFactory.setListClass('clothing', Clothing)
ProductFactory.setListClass('phone', Phone)
ProductFactory.setListClass('electric', Electric)



export default ProductFactory