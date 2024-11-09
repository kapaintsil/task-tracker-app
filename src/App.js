// src/App.js
import { useEffect, useState } from "react";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all"); // New filter state

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addOrEditTask = () => {
    if (title.trim() && description.trim()) {
      if (editMode && currentTaskIndex !== null) {
        const updatedTasks = tasks.map((task, index) =>
          index === currentTaskIndex ? { ...task, title, description } : task
        );
        setTasks(updatedTasks);
        setEditMode(false);
        setCurrentTaskIndex(null);
      } else {
        setTasks([...tasks, { title, description, completed: false }]); // Add `completed` status
      }
      setTitle("");
      setDescription("");
    }
  };

  const editTask = (index) => {
    setTitle(tasks[index].title);
    setDescription(tasks[index].description);
    setEditMode(true);
    setCurrentTaskIndex(index);
  };

  const deleteTask = (taskIndex) => {
    setTasks(tasks.filter((_, index) => index !== taskIndex));
    if (editMode && currentTaskIndex === taskIndex) {
      setEditMode(false);
      setCurrentTaskIndex(null);
      setTitle("");
      setDescription("");
    }
  };

  // Toggle task completion status
  const toggleCompletion = (taskIndex) => {
    const updatedTasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Filter tasks based on the selected filter status
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "completed") return task.completed;
    if (filterStatus === "pending") return !task.completed;
    return true; // "all"
  });

  return (
    <div className="App">
      <header>
        <h1>Task Tracker</h1>
      </header>
      <nav>
        <TaskForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          addTask={addOrEditTask}
          editMode={editMode}
        />
        <div>
          <label>
            <input
              type="radio"
              value="all"
              checked={filterStatus === "all"}
              onChange={() => setFilterStatus("all")}
            />{" "}
            All
          </label>
          <label>
            <input
              type="radio"
              value="completed"
              checked={filterStatus === "completed"}
              onChange={() => setFilterStatus("completed")}
            />{" "}
            Completed
          </label>
          <label>
            <input
              type="radio"
              value="pending"
              checked={filterStatus === "pending"}
              onChange={() => setFilterStatus("pending")}
            />{" "}
            Pending
          </label>
        </div>
      </nav>
      <main>
        <TaskList
          tasks={filteredTasks}
          editTask={editTask}
          deleteTask={deleteTask}
          toggleCompletion={toggleCompletion}
        />
      </main>
      <footer>
        <p>sponsored by:</p>
        <img src="../images/verifybuy-logo.png" alt="verifybuy-logo"/>
      </footer>
    </div>
  );
}

export default App;
