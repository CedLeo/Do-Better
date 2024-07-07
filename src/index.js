import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TodoWrapper } from "./components/TodoWrapper";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Timer from "../src/pages/timer/Timer";
import Schedule from "../src/pages/schedule/Schedule";
import Settings from "../src/pages/settings/Settings";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <Router>
    <Navbar />
    <Routes>
      <Route path="*" element={<TodoWrapper />} />
      <Route path="/home" element={<App />} />
      <Route path="/schedule" element={<Schedule />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/timer" element={<Timer />} />
    </Routes>
  </Router>
  //<Settings />
  //</React.StrictMode>
);
