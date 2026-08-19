const express = require("express");
require("dotenv").config();

const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = require("./config/db");

const menuItemRoutes = require("./routes/menuItemRoutes");
const orderRoutes = require("./routes/orderRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

connectDB();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);


app.get("/", (req, res) => {
  res.send("Restaurant Backend is running!");
});

app.post("/test", (req, res) => {
  res.json({ message: "POST is working" });
});
app.use("/api/menu-items", menuItemRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});