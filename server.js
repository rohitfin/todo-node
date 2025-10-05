console.log("Jai Siya Ram 🙏");

const express = require("express"); //import express from "express";

const dotenv = require("dotenv");
dotenv.config();
const dbConnection = require("./config/dbConnection");
dbConnection();

const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");
const todoRoutes = require("./routes/todoRoutes"); //import todoRoutes from "./routes/todoRoutes"
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");



// Middleware (for JSON body parsing)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow requests from Angular (localhost:4200)
app.use(cors({
  origin: "http://localhost:4200",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // if using cookies/auth
}));

// app.use(cors()); // Allow of all requests


// Root route
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

// todo routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/todo", todoRoutes);

app.listen(port, () => {
  console.log(`✅ Server on port 🚀 http://localhost:${port}`);
});
