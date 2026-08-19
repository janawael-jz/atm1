const Payment = require("../models/Payment");
const Order = require("../models/Order");

const createPayment = async (req, res) => {
  try {
    const { orderId, person } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const personData = order.splitBill.find(
      (p) => p.person === Number(person)
    );

    if (!personData) {
      return res.status(404).json({
        success: false,
        message: "Person not found",
      });
    }

    if (personData.status === "paid") {
      return res.status(400).json({
        success: false,
        message: "This person already paid",
      });
    }

    const payment = await Payment.create({
      order: orderId,
      person: person,
      amount: personData.amount,
      paymentMethod: "visa",
      status: "success",
    });

    personData.status = "paid";

    const allPaid = order.splitBill.every(
      (p) => p.status === "paid"
    );

    if (allPaid) {
      order.status = "paid";
    }

    await order.save();

    res.status(201).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
const getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate("order");

    res.status(200).json({
      success: true,
      data: payments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  createPayment,
  getPayments,
};