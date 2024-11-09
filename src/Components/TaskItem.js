
function TaskItem({ 
  task, 
  editTask, 
  deleteTask, 
  toggleCompletion,
}) {
  return (
    <div className="task-item">
      <h3 style={{ backgroundColor: task.completed ? "var(--primary-red-color)" : "var(--primary-blue-color)" }}> 
        {task.title}
      </h3>
      <p>{task.description}</p>
      <div className="controls">
        <label>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={toggleCompletion}
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
