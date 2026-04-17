const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const app = express();

require('dotenv').config();
connectDB();

app.use(cors());
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const messageRoutes = require("./routes/messageRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);


app.get('/', (req, res) => {
    res.send('Welcome to FloralAI Backend!');
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});