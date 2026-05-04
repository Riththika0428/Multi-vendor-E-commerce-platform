const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:3000", // Allow frontend to send credentials
  credentials: true
}));
app.use(express.json());
app.use(cookieParser()); // Enable cookie parsing

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/multivendor")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Note: JWT_SECRET and GOOGLE_CLIENT_ID should be added to your .env file
if (!process.env.JWT_SECRET) console.warn("WARNING: JWT_SECRET is missing from .env");

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});