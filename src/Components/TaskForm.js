
// The TaskForm component receives task-related props and handles form submission
const TaskForm = ({ 
  title,                    // Holds the value of the task title input
  setTitle,                // Function to update the task title state
  description,            // Holds the value of the task description input
  setDescription,        // Function to update the task description state
  addTask,              // Function to add or update the task
  editMode             // Boolean to determine whether we're adding or editing a task
}) => {

  // Handles form submission and triggers the addTask function
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask();  // Calls the addTask function to either add or update a task
  };

  return (
    // Form element that handles the task input and submit actions
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}    // Binds the title state to the input field
        onChange={(e) => setTitle(e.target.value)} // Updates the title state on change
        required
      />
      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <button 
        className="submit-button"
        type="submit"
      >
         {/* Displays different text based on whether we're in edit mode or not */}
        {editMode ? "Save Changes" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
