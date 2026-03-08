const express = require("express");
const router = express.Router();
const db = require("./db");

router.get("/", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { title, description, due_date } = req.body;

  db.query(
    "INSERT INTO tasks (title, description, due_date, status) VALUES (?, ?, ?, 'pending')",
    [title, description, due_date],
    (err, result) => {
      res.json({ message: "Task added" });
    }
  );
});

router.put("/:id", (req, res) => {
  const { title, description, status } = req.body;

  db.query(
    "UPDATE tasks SET title=?, description=?, status=? WHERE id=?",
    [title, description, status, req.params.id],
    () => {
      res.json({ message: "Task updated" });
    }
  );
});

router.delete("/:id", (req, res) => {
  db.query("DELETE FROM tasks WHERE id=?", [req.params.id], () => {
    res.json({ message: "Task deleted" });
  });
});

module.exports = router;