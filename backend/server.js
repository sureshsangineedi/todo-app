const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const file = "todos.json";

app.get("/todos", (req, res) => {
  const data = JSON.parse(fs.readFileSync(file));
  res.json(data);
});

app.post("/todos", (req, res) => {
  const data = JSON.parse(fs.readFileSync(file));
  const newTodo = { id: Date.now(), text: req.body.text };
  data.push(newTodo);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.json(newTodo);
});

app.delete("/todos/:id", (req, res) => {
  let data = JSON.parse(fs.readFileSync(file));
  const id = Number(req.params.id);
  data = data.filter(todo => todo.id !== id);
  fs.writeFileSync(file, JSON.stringify(data, null, 2));
  res.json({ msg: "Todo deleted", id });
});

app.listen(5000, () => console.log("Server started on port 5000"));