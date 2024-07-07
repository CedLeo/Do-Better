import React, { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");
  const [dueTime, setDueTime] = useState("");
  const [priority, setPriority] = useState(1); // Default priority 1

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value) {
      addTodo(value, dueTime, priority); // Pass value, dueTime, and priority to addTodo function
      setValue("");
      setDueTime("");
      setPriority(1); // Reset priority to default after submission
    }
  };

  const getTaskStyle = (priority) => {
    switch (priority) {
      case 3:
        return { backgroundColor: "red" };
      case 2:
        return { backgroundColor: "yellow" };
      default:
        return {};
    }
  };

  const handlePriorityChange = () => {
    setPriority((prevPriority) => {
      if (prevPriority === 3) {
        return 1;
      } else {
        return prevPriority + 1;
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="What is the task today?"
      />
      {/* Add input fields for due time and priority */}
      <input
        type="time"
        value={dueTime}
        onChange={(e) => setDueTime(e.target.value)}
        className="due-time-input"
        placeholder="Due Time"
      />
      <button
        type="button"
        onClick={handlePriorityChange}
        className="priority-button "
      >
        Priority: {priority}
      </button>
      <button type="submit" className="todo-btn">
        Add Task
      </button>
      {/* Apply conditional styling based on priority */}
      {getTaskStyle(priority) && (
        <style>{`
          .task {
            ${getTaskStyle(priority)}
          }
        `}</style>
      )}
    </form>
  );
};
