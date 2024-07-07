/*global chrome*/
import React, { useState, useEffect } from 'react';
import "./timer.css";

import notificationSound from './notif.mp3'; // Import the audio file

export default function Timer() {
  const [taskMinutes, setTaskMinutes] = useState(0);
  const [taskSeconds, setTaskSeconds] = useState(1);
  const [breakMinutes, setBreakMinutes] = useState(0);
  const [breakSeconds, setBreakSeconds] = useState(1);
  const [taskNotificationMessage, setTaskNotificationMessage] = useState('');
  const [breakNotificationMessage, setBreakNotificationMessage] = useState('');
  const [isTaskRunning, setIsTaskRunning] = useState(false);
  const [isBreakRunning, setIsBreakRunning] = useState(false);

  // Function to reset the task timer
  const resetTaskTimer = () => {
    setTaskMinutes(0);
    setTaskSeconds(1);
  };

  // Function to reset the break timer
  const resetBreakTimer = () => {
    setBreakMinutes(0);
    setBreakSeconds(1);
  };

  // Function to play notification sound
  const playNotificationSound = () => {
    const audio = new Audio(notificationSound);
    audio.play();
  };

  useEffect(() => {
    let taskInterval;
    let breakInterval;

    if (isTaskRunning) {
      taskInterval = setInterval(() => {
        if (taskSeconds === 0) {
          if (taskMinutes === 0) {
            clearInterval(taskInterval);
            setIsTaskRunning(false);
            playNotificationSound(); // Play sound notification
            setTimeout(() => {
              alert(taskNotificationMessage); // Notify user when task timer ends
            }, 100); // Delay alert to ensure sound plays first
            setIsBreakRunning(true);
            resetTaskTimer(); // Reset task timer
            return;
          } else {
            setTaskMinutes(taskMinutes - 1);
            setTaskSeconds(59);
          }
        } else {
          setTaskSeconds(taskSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(taskInterval);
    }

    if (isBreakRunning) {
      breakInterval = setInterval(() => {
        if (breakSeconds === 0) {
          if (breakMinutes === 0) {
            clearInterval(breakInterval);
            setIsBreakRunning(false);
            playNotificationSound(); // Play sound notification
            setTimeout(() => {
              alert(breakNotificationMessage); // Notify user when break timer ends
            }, 100); // Delay alert to ensure sound plays first
            resetBreakTimer(); // Reset break timer
            return;
          } else {
            setBreakMinutes(breakMinutes - 1);
            setBreakSeconds(59);
          }
        } else {
          setBreakSeconds(breakSeconds - 1);
        }
      }, 1000);
    } else {
      clearInterval(breakInterval);
    }

    return () => {
      clearInterval(taskInterval);
      clearInterval(breakInterval);
    };
  }, [isTaskRunning, isBreakRunning, taskMinutes, taskSeconds, breakMinutes, breakSeconds, taskNotificationMessage, breakNotificationMessage]);

  const startTaskTimer = () => {
    setIsTaskRunning(true);
  };

  const startBreakTimer = () => {
    setIsBreakRunning(true);
  };

  const stopTimer = () => {
    setIsTaskRunning(false);
    setIsBreakRunning(false);
  };

  const handleTaskMinutesChange = e => {
    setTaskMinutes(parseInt(e.target.value));
  };

  const handleTaskSecondsChange = e => {
    setTaskSeconds(parseInt(e.target.value));
  };

  const handleBreakMinutesChange = e => {
    setBreakMinutes(parseInt(e.target.value));
  };

  const handleBreakSecondsChange = e => {
    setBreakSeconds(parseInt(e.target.value));
  };

  const handleTaskNotificationChange = e => {
    setTaskNotificationMessage(e.target.value);
  };

  const handleBreakNotificationChange = e => {
    setBreakNotificationMessage(e.target.value);
  };

  return (
      <div className='timerWrapper'>
        <div className="timerContent">
          <h1 className='timerTitle'>Track your time with this Timer!</h1>
          <div className="timerDivision">
          <div className='timerTime timerElement'>
            <h3>Task Time</h3>
            <div className='inputArea'>
            <span>Minutes</span>
              <input type="number" value={taskMinutes} onChange={handleTaskMinutesChange} className='minuteInput' />
              <span>Seconds</span>
              <input type="number" value={taskSeconds} onChange={handleTaskSecondsChange} className='secondInput' />
            </div>
          </div>
          <div className='timerTime timerElement'>
            <h3>Break Time</h3>
            <div className='inputArea'>
            <span>Minutes</span>
              <input type="number" value={breakMinutes} onChange={handleBreakMinutesChange} className='minuteInput' />
              <span>Seconds</span>
              <input type="number" value={breakSeconds} onChange={handleBreakSecondsChange} className='secondInput' />
            </div>
          </div>
          </div>


          <div className='timerMessage timerElement notifInput'>
            <input type="text" value={taskNotificationMessage} onChange={handleTaskNotificationChange} placeholder="Task Notification" />
          </div>
          <div className='timerMessage timerElement notifInput'>
            <input type="text" value={breakNotificationMessage} onChange={handleBreakNotificationChange} placeholder="Break Notification" />
          </div>
          <div className='timerControls timerElement timerButtons'>
            <button onClick={startTaskTimer}>Start Task</button>
            <button onClick={startBreakTimer}>Start Break</button>
            <button onClick={stopTimer}>Stop</button>
          </div>
        </div>
      </div>
  );
}
