const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        menuItem: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "MenuItem",
          required: true,
        },

        quantity: {
          type: Number,
          required: true,
          min: 1,
        },

        price: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    numberOfPeople: {
      type: Number,
      required: true,
      min: 1,
    },

    splitBill: [
      {
        person: {
          type: Number,
          required: true,
        },

        amount: {
          type: Number,
          required: true,
          min: 0,
        },

        status: {
          type: String,
          enum: ["pending", "paid"],
          default: "pending",
        },
      },
    ],

    status: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);