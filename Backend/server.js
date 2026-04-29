const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();
const bouquetRoutes = require("./routes/bouquetRoutes");
const errorHandler = require("./middleware/errorHandler");
const allowedOrigins = [
  "http://localhost:5173",
  "https://your-frontend-domain.com",
];

require('dotenv').config();
connectDB();

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/bouquets", bouquetRoutes);
app.use(errorHandler);


app.get('/', (req, res) => {
    res.send('Welcome to FloralAI Backend!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});