const express = require("express");

const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrderById,
  payPerson,
} = require("../controllers/orderController");

router.post("/", createOrder);

router.get("/", getOrders);

router.get("/:id", getOrderById);

router.patch("/pay", payPerson);

module.exports = router;