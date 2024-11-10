
// TaskItem component displays individual task details and controls for editing and deleting tasks
function TaskItem({ 
  task,                // The task object containing title, description, and completion status
  editTask,           // Function to trigger task editing
  deleteTask,        // Function to trigger task deletion
  toggleCompletion, // Function to toggle the completion status of the task
}) {

  return (
    <div className="task-item">
       {/* Task description with line-through style if task is completed */}
      <h3 
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      > 
        {task.title}
      </h3>
      <p 
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.description}
      </p>
      <div className="controls">
        <label>
          <input
            type="checkbox"
            checked={task.completed}  // Checkbox is checked if task is completed
            onChange={toggleCompletion} // Trigger toggleCompletion function on change
          />
          Completed
        </label>
        <div>
          <button onClick={editTask}>Edit</button>
          <button onClick={deleteTask}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default TaskItem;
