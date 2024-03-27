const mongoose = require("mongoose");
const validator = require("validator");
const UserModel = require("../User/schema");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User schema for user information
    // required: true,
  },

  address: {
    type: String,
  },

  contact_no: {
    type: String,
    // required: true,
    validate: {
      validator: function (value) {
        // Using validator library to check if it's a valid phone number
        return validator.isMobilePhone(value, "any", { strictMode: false });
      },
    },
  },

  payment: {
    ype: String,
    enum: ["cash on delivery", "UPI"],
  },

  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Shipped", "Delivered"],
    default: "Pending",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const orderModel = new mongoose.model("Order", orderSchema);

module.exports = orderModel;
