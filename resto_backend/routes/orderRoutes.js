const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getOrderById,
  payPerson,
} = require("../controllers/orderController");
const protect = require("../middleware/authMiddleware");

router.post("/", createOrder);

router.get("/",protect, getOrders);

router.get("/:id", getOrderById);

router.patch("/pay", payPerson);

module.exports = router;