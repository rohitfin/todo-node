const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("All Todos");
});

router.get("/:id", (req, res) => {
  const todoId = req.params.id;
  res.send("todo id => " + todoId);
});



module.exports = router;