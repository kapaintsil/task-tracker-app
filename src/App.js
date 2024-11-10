import { useEffect, useState } from "react";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import "./App.css";

function App() {
  
  //State hook for managing tasks.
  //Initializes the state with tasks stored in localStorage if available, otherwise sets it to an empty array.
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // useState hooks for task management:
  const [title, setTitle] = useState(""); // - `title` and `description`: handle task input values.
  const [description, setDescription] = useState("");
  const [editMode, setEditMode] = useState(false);    // - `editMode`: toggles between adding/editing tasks.
  const [currentTaskIndex, setCurrentTaskIndex] = useState(null); // - `currentTaskIndex`: tracks the task being edited.
  const [filterStatus, setFilterStatus] = useState("all"); // - `filterStatus`: manages task filtering.

  // Updates localStorage whenever the `tasks` state changes, saving tasks persistently.
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Adds a new task or edits an existing one depending on the editMode state
  const addOrEditTask = () => {
    if (title.trim() && description.trim()) {
       // If in edit mode, update the existing task at the currentTaskIndex
      if (editMode && currentTaskIndex !== null) {
        const updatedTasks = tasks.map((task, index) =>
          index === currentTaskIndex ? { ...task, title, description } : task
        );
        setTasks(updatedTasks); // Updates the tasks array with the modified task
        setEditMode(false);  // Disables edit mode after update
        setCurrentTaskIndex(null); // Resets the current task index
      } else {
        // If not in edit mode, adds a new task to the tasks array with `completed: false`
        setTasks([...tasks, { title, description, completed: false }]); // Add `completed` status
      }
      // Clears the title and description input fields
      setTitle("");
      setDescription("");
    }
  };

   // Edits the task at the specified index.
   // index - The index of the task to be edited.
  const editTask = (index) => {
    setTitle(tasks[index].title);
    setDescription(tasks[index].description);
    setEditMode(true);
    setCurrentTaskIndex(index);
  };


   // Deletes a task from the tasks list by its index.
   // If the task being deleted is currently being edited, it exits edit mode and clears the form.
  const deleteTask = (taskIndex) => {
    setTasks(tasks.filter((_, index) => index !== taskIndex));
    if (editMode && currentTaskIndex === taskIndex) {
      setEditMode(false);
      setCurrentTaskIndex(null);
      setTitle("");
      setDescription("");
    }
  };

  // Toggles the completion status of a task by flipping the `completed` property.
  // It updates the `tasks` state by creating a new array with the modified task.
  const toggleCompletion = (taskIndex) => {
    const updatedTasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  // Filters tasks based on the selected filter status ("completed", "pending", or "all").
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "completed") return task.completed; // - "completed": shows only completed tasks.
    if (filterStatus === "pending") return !task.completed; // - "pending": shows only tasks that are not completed.
    return true; // - "all": shows all tasks, regardless of completion status.
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
