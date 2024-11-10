import TaskItem from "./TaskItem";

// TaskList component renders a list of tasks by mapping over the `tasks` array
const TaskList = ({ 
  tasks,                // Array of tasks to display
  editTask,            // Function to handle editing a task
  deleteTask,         // Function to handle deleting a task
  toggleCompletion   // Function to handle toggling task completion
}) => {
  return (
    <div>
      {tasks.map((task, index) => (
        <TaskItem
          key={index}
          task={task}
          editTask={() => editTask(index)}
          deleteTask={() => deleteTask(index)}
          toggleCompletion={() => toggleCompletion(index)}
        />
      ))}
    </div>
  );
};

export default TaskList;
