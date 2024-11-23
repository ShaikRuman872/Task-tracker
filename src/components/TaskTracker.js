import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";

const TaskTracker = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    dueDate: "",
    status: "Pending",
  });

  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const addOrEditTask = () => {
    if (editIndex !== null) {
      const updatedTasks = tasks.map((task, index) =>
        index === editIndex ? newTask : task
      );
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, newTask]);
    }
    setNewTask({ title: "", description: "", dueDate: "", status: "Pending" });
  };

  const editTask = (index) => {
    setNewTask(tasks[index]);
    setEditIndex(index);
  };

  const deleteTask = (index) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="task-tracker">
      <h1>Task Tracker</h1>
      <div className="task-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={newTask.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newTask.description}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="dueDate"
          value={newTask.dueDate}
          onChange={handleInputChange}
        />
        <select
          name="status"
          value={newTask.status}
          onChange={handleInputChange}
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={addOrEditTask}>
          {editIndex !== null ? "Update Task" : "Add Task"}
        </button>
      </div>
      <TaskList tasks={tasks} editTask={editTask} deleteTask={deleteTask} />
    </div>
  );
};

export default TaskTracker;
