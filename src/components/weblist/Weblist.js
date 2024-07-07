import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export const Weblist = ({ task, deleteTodo }) => {
  useEffect(() => {
    console.log(task.task); // Logging the webName only once on component mount
  }, []);

  return (
    <div className="Todo priority-low">
      <p id="webName">{task.task}</p>
      <div>
        <FontAwesomeIcon
          className="delete-icon"
          icon={faTrash}
          onClick={() => deleteTodo(task.id)}
        />
      </div>
    </div>
  );
};
