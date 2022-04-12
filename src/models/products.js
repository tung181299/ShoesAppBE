const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productsSchema = new Schema({
  name: {
    type: String,
    require: true
  },
  brand: {
    type: String,
    require: true
  },
  information: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: true
  },
  discount: {
    type: Number,
    require: false
  },
  quantity: {
    type: Number,
    require: true
  },
  type: {
    type: String,
    require: false
  },
  images: {
    type: Object
  },
}, {timestamps: true})

const Products = mongoose.model('Products', productsSchema)
module.exports = Products