const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // Allow frontend to send credentials
  credentials: true
}));
app.use(express.json());
app.use(cookieParser()); // Enable cookie parsing

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/multivendor", {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 10s default
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    // Only exit if we're not in the middle of a dev session where DB might come back up
    if (process.env.NODE_ENV === 'production') process.exit(1);
  }
};

// Note: JWT_SECRET and GOOGLE_CLIENT_ID should be added to your .env file
if (!process.env.JWT_SECRET) console.warn("WARNING: JWT_SECRET is missing from .env");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const startServer = async () => {
  await connectDB();
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
  });
};

startServer();
