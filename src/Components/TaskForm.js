
const TaskForm = ({ 
  title, 
  setTitle, 
  description, 
  setDescription, 
  addTask, 
  editMode 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    addTask();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
        {editMode ? "Save Changes" : "Add Task"}
      </button>
    </form>
  );
};

export default TaskForm;
