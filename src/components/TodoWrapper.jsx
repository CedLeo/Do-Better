  /*global chrome*/

import React, { useEffect, useState } from "react";
import { Todo } from "./todo/Todo";
import { TodoForm } from "./todo/TodoForm";
import { v4 as uuidv4 } from "uuid";
import { EditTodoForm } from "./todo/EditTodoForm";



export const TodoWrapper = () => {

// ==========================================================================

// var WebsiteUrl;
// var WebsiteHostName;

// chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     WebsiteUrl = tabs[0].url
//     WebsiteHostName = new URL(tabs[0].url).hostname

//     document.getElementById("url").innerText = WebsiteHostName
// })
// ==========================================================================




const [todos, setTodos] = useState([]);
const [dueDate, setDueDate] = useState("");
const [priority, setPriority] = useState(1); // Default priority 1
const [completedPercentage, setCompletedPercentage] = useState(0);
const [headingText, setHeadingText] = useState("What are your tasks for today?");


  useEffect(() => {
    // Load todos from local storage on component mount
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  useEffect(() => {
    // Save todos to local storage whenever todos state changes
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const calculateCompletedPercentage = () => {
      if (todos.length === 0) {
        setCompletedPercentage(0);
      } else {
        const completedTodosCount = todos.filter(todo => todo.completed).length;
        const percentage = (completedTodosCount / todos.length) * 100;
        setCompletedPercentage(percentage);
        if (percentage >= 99.9) {
          setTodos([]);
          setHeadingText("Goodjob! You can now open any websites!")
  
          setTimeout(() => {
            chrome.management.getSelf(function(extensionInfo) {
              var extensionId = extensionInfo.id;
              chrome.management.setEnabled(extensionId, false, function() {
                if (chrome.runtime.lastError) {
                  console.error('Error disabling extension:', chrome.runtime.lastError.message);
                } else {
                  console.log('Extension disabled successfully');
                }
              });
            });
          }, 2000); // Start disabling extension with little delay
        }
      }
    };
  
    calculateCompletedPercentage();
  }, [todos]);
  

  const addTodo = (todo, dueDate, priority) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, dueDate, priority, completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const sortByPriority = (todos) => {
    return todos.sort((a, b) => b.priority - a.priority);
  };


  return (

      <div className="container2">
              <div className="ProgressbarWrapper">
        <div class="cardbar">
          <div class="bar">
            <h4 id="url"></h4>
            <h2>{`${completedPercentage.toFixed(2)}%`}</h2>
            <ul className="progress-bar" style={{ "--completed-percentage": completedPercentage }}>
            <li className="active"></li>
          </ul>
          </div>
        </div>
      </div>
      <div className="TodoOuterWrapper">
          <div className="TodoWrapper">
            <h1>{headingText}</h1>
            {/* TodoForm with due date and priority inputs */}
            <TodoForm addTodo={addTodo} />
            {/* Display sorted todos */}
            {sortByPriority(todos).map((todo) =>
              todo.isEditing ? (
                <EditTodoForm key={todo.id} editTodo={editTask} task={todo} />
              ) : (
                <Todo
                  key={todo.id}
                  task={todo}
                  deleteTodo={deleteTodo}
                  editTodo={editTodo}
                  toggleComplete={toggleComplete}
                  className={todo.priority === 3 ? "priority-high" : todo.priority === 2 ? "priority-medium" : "priority-low"}
                />
              )
            )}
          </div>
        </div>
      </div>
 
  );


};


