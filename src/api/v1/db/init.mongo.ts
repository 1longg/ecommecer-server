/* eslint-disable @typescript-eslint/no-unused-vars */
import mongoose from 'mongoose'
import configMongo from '../../../config/config.mongo'
require('dotenv').config()

const {
  app,
  db
}: {
  app: { port: string }
  db: {
    port: string
    host: string
    name: string
  }
} = configMongo
const connectString = `mongodb://${db.host}:${db.port}/${db.name}`

class Database {
  static instance: Database
  constructor() {
    this.connect()
  }
  connect() {
    mongoose
      .connect(connectString)
      .then(() => {
        console.log('Database connected')
      })
      .catch((err) => {
        console.log(err)
        console.log('Error connecting to database')
      })
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }
}

const instanceMongoDb = Database.getInstance()

export default instanceMongoDb
