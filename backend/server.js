const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://groceryapp-t1qk.onrender.com", // your vercel URL
    ],
    credentials: true,
  }),
);
app.use(express.json());

// DB Connect (optional - works without it for demo)
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("✅ Database connected successfully");
      console.log(`📍 MongoDB URI: ${process.env.MONGODB_URI}`);
    })
    .catch((err) => {
      console.log("❌ MongoDB connection error:", err.message);
    });
}

// Routes
app.use("/auth", require("./routes/auth"));
app.use("/products", require("./routes/products"));
app.use("/categories", require("./routes/categories"));
app.use("/cart", require("./routes/cart"));
app.use("/orders", require("./routes/orders"));

app.get("/", (req, res) => res.json({ message: "Blinkit API running!" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
