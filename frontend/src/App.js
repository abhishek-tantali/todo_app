import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const getTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = async () => {
    if (!title) {
      alert("Enter task title");
      return;
    }

    await axios.post("http://localhost:5000/tasks", {
      title,
      description,
      due_date: dueDate
    });

    setTitle("");
    setDescription("");
    setDueDate("");

    getTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    getTasks();
  };

  const completeTask = async (task) => {
    await axios.put(`http://localhost:5000/tasks/${task.id}`, {
      title: task.title,
      description: task.description,
      status: "completed"
    });

    getTasks();
  };

  return (
    <div className="container">

      <h1 className="title">Task Manager</h1>

      <div className="task-form">

        <input
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button className="add-btn" onClick={addTask}>
          Add Task
        </button>

      </div>

      <h2>My Tasks</h2>

      <div className="task-list">

        {tasks.map((task) => (
          <div className="task-card" key={task.id}>

            <h3>{task.title}</h3>
            <p>{task.description}</p>

            <p><b>Due:</b> {task.due_date}</p>
            <p><b>Status:</b> {task.status}</p>

            <div className="buttons">

              <button
                className="complete-btn"
                onClick={() => completeTask(task)}
              >
                Complete
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default App;