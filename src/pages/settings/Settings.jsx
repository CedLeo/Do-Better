/*global chrome*/
import React, { useEffect, useState } from "react";
import "./settings.css"
import { Todo, Weblist } from "../../components/weblist/Weblist";
import { TodoForm } from "../../components/weblist/TodoForm";
import { v4 as uuidv4 } from "uuid";

export default function Settings() {
    
  var WebsiteUrl;
  var WebsiteHostName;

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    WebsiteUrl = tabs[0].url
    WebsiteHostName = new URL(tabs[0].url).hostname

    document.getElementById("url").innerText = "you are currently in: " + WebsiteHostName
})

//#region 
  const [todos, setTodos] = useState([]);
  const [headingText, setHeadingText] = useState("Are there any websites that distracts you?");
  const [webNames, setWebNames] = useState([]);


  useEffect(() => {
    // Load todos from local storage on component mount
    const savedTodos = JSON.parse(localStorage.getItem('settingsTodos')) || [];
setTodos(savedTodos);

    const extractedWebNames = savedTodos.map(todo => todo.task);
    setWebNames(extractedWebNames);
  }, []);

  useEffect(() => {
    // Save todos and webNames to local storage whenever they change
    localStorage.setItem('settingsTodos', JSON.stringify(todos));
    localStorage.setItem('webNames', JSON.stringify(webNames));
  }, [todos, webNames]);

  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo },
    ]);
    localStorage.setItem('settingsTodos', JSON.stringify(todos));

  };

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));
//#endregion


return (

    <div class="settingsWrapper">
        <div className="webListWrapper">
          <h1>{headingText}</h1>
          <p id="url"></p>
          <TodoForm addTodo={addTodo} />
          {/* display todos */}
          {todos.map((todo) =>(
              <Weblist
                key={todo.id}
                task={todo}
                deleteTodo={deleteTodo}
              />
            )
          )}
        </div>
      </div>
  )
}
