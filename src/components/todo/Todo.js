import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faSquareCheck } from "@fortawesome/free-solid-svg-icons";

// Import your sound file
import completeSound from "./notif2.ogg";

export const Todo = ({ task, deleteTodo, editTodo, toggleComplete }) => {
  // Function to play the sound effect
  const playCompleteSound = () => {
    const audio = new Audio(completeSound);
    audio.play();
  };

  return (
    <div
      className={`Todo ${
        task.priority === 3
          ? "priority-high"
          : task.priority === 2
          ? "priority-medium"
          : "priority-low"
      }`}
    >
      <div className="check-icon">
        <FontAwesomeIcon
          icon={faSquareCheck}
          onClick={() => {
            toggleComplete(task.id);
            playCompleteSound(); // Call the function to play sound
          }}
        />
      </div>
      <div className="task-info">
        {task.dueDate && (
          <p className="due-date">This task is due at {task.dueDate}</p>
        )}
        <p
          className={`${task.completed ? "completed" : "incompleted"}`}
          onClick={() => toggleComplete(task.id)}
        >
          {task.task}
        </p>
      </div>
      <div>
        <FontAwesomeIcon
          className="edit-icon"
          icon={faPenToSquare}
          onClick={() => editTodo(task.id)}
        />
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={() => deleteTodo(task.id)}
        />
      </div>
    </div>
  );
};
