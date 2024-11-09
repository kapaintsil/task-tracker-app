// src/components/TaskList.js
import React from "react";
import TaskItem from "./TaskItem";

const TaskList = ({ 
  tasks, 
  editTask, 
  deleteTask, 
  toggleCompletion 
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
