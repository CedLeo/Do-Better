/*global chrome*/
import React, { useState } from "react";

export const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  // ==========================================================================
  // var WebsiteUrl;
  // var WebsiteHostName;

  // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  //   WebsiteUrl = tabs[0].url;
  //   WebsiteHostName = new URL(tabs[0].url).hostname;
  // });
  // ==========================================================================

  const handleSubmit = (e) => {
    // ==========================================================================
    //     if (WebsiteUrl.toLowerCase().includes("chrome://")) {
    //       alert("You cannot block a Chrome website.");
    //     }
    // ==========================================================================

    // prevent default action
    e.preventDefault();
    if (value) {
      // add todo
      addTodo(value);
      // clear form after submission
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="TodoForm">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="todo-input"
        placeholder="Block them here by putting the url!"
      />
      <button type="submit" className="todo-btn">
        Add Blocklist
      </button>
    </form>
  );
};
