const Order = require("../models/Order");
const MenuItem = require("../models/MenuItem");

const createOrder = async (req, res) => {
  try {
    const { items, numberOfPeople } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one item",
      });
    }

    if (!numberOfPeople || numberOfPeople < 1) {
      return res.status(400).json({
        success: false,
        message: "Number of people must be at least 1",
      });
    }

    const orderItems = [];
    let totalAmount = 0;

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);

      if (!menuItem) {
        return res.status(404).json({
          success: false,
          message: `Menu item ${item.menuItem} not found`,
        });
      }

      if (!menuItem.available) {
        return res.status(400).json({
          success: false,
          message: `${menuItem.name} is not available`,
        });
      }

      const quantity = item.quantity || 1;
      const itemTotal = menuItem.price * quantity;

      orderItems.push({
        menuItem: menuItem._id,
        quantity: quantity,
        price: menuItem.price,
      });

      totalAmount += itemTotal;
    }

    const amountPerPerson = totalAmount / numberOfPeople;

    const splitBill = [];

    for (let i = 1; i <= numberOfPeople; i++) {
      splitBill.push({
        person: i,
        amount: amountPerPerson,
        status: "pending",
      });
    }

    const order = await Order.create({
      items: orderItems,
      totalAmount,
      numberOfPeople,
      splitBill,
    });

    res.status(201).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("items.menuItem");

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("items.menuItem");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const payPerson = async (req, res) => {
  try {
    const { orderId, person } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    const personIndex = order.splitBill.findIndex(
      (p) => p.person === Number(person)
    );

    if (personIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Person not found",
      });
    }

    if (order.splitBill[personIndex].status === "paid") {
      return res.status(400).json({
        success: false,
        message: "This person already paid",
      });
    }

    order.splitBill[personIndex].status = "paid";

    const allPaid = order.splitBill.every(
      (p) => p.status === "paid"
    );

    if (allPaid) {
      order.status = "paid";
    }

    await order.save();

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById,
  payPerson,
};