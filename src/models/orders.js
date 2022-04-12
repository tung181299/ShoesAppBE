const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema(
  {
    customerName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    productId: {
      type: String,
      require: true,
    },
    productName: {
      type: String,
      require: true,
    },
    productBrand: {
      type: String,
      require: true,
    },
    quantity: {
      type: Number,
      require: true,
    },
    orderStatus: {
      type: Number,
      required: true
    },
  },
  { timestamps: true }
);

const Orders = mongoose.model("Orders", ordersSchema);
module.exports = Orders;
