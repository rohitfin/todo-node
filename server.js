console.log("Jai Siya Ram 🙏");

const express = require("express");
const todoRoutes = require("./routes/todoRoutes.ts");

const app = express();
const port = 3000;

// Middleware (for JSON body parsing)
app.use(express.json());

// Root route
app.get("/", (req, res) => {
  res.send("Hello World!!");
});

// todo routes
app.use("/api/todo", todoRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
