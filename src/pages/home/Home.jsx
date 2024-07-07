import React, { useEffect, useState } from "react";
import "./home.css";
import Clock from "../../components/clock/Clock";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faListCheck,
  faClock,
  faGear,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function Home() {

    const [secondRatio, setSecondRatio] = useState(0);
    const [minuteRatio, setMinuteRatio] = useState(0);
    const [hourRatio, setHourRatio] = useState(0);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentTime, setCurrentTime] = useState("");
  
    useEffect(() => {
      const interval = setInterval(() => {
        setClock();
        setCurrentTime(new Date().toLocaleTimeString()); // Update current time
      }, 1000);
  
      return () => clearInterval(interval);
    }, []);
  
    useEffect(() => {
      const dateTimer = setInterval(() => {
        setCurrentDate(new Date());
      }, 1000 * 60); // Update date every minute
  
      return () => clearInterval(dateTimer);
    }, []);
  
    const setClock = () => {
      const currentDate = new Date();
      const secondRatio = currentDate.getSeconds() / 60;
      const minuteRatio = (secondRatio + currentDate.getMinutes()) / 60;
      const hourRatio = (minuteRatio + currentDate.getHours()) / 12;
  
      setSecondRatio(secondRatio);
      setMinuteRatio(minuteRatio);
      setHourRatio(hourRatio);
    };
  
    const formatDate = (date) => {
      const options = {
        weekday: "long",
        month: "long",
        day: "numeric",
        year: "numeric",
      };
      return date.toLocaleDateString("en-US", options);
    };






  return (
    <div className="homeWrapper">
        <div className="homeNav">
        </div>
        <div className="homeContent">
            <div className="homeLeft">
                <div className="tagline">
                <div className="greetings">
                  <h1>Hello, User</h1>
                  <p>what can we do for you today?</p>
                </div>
                <div className="userStats">
                  <h3 className="userStatTitle">User Profile</h3>
                  <p className="statTitle">Tasks Done today:</p>
                  <p>22 tasks completed</p>
                  <p className="statTitle">Upcoming schedule:</p>
                  <p>Research defense - Saturday, April 4, 2024</p>
                  <p className="statTitle">Current timer:</p>
                  <p>Break time: 5:00 left</p>
                  <p className="statTitle">Upcoming Due task:</p>
                  <p>Research Program 11:59 pm</p>
                </div>
                </div>
                <div className="navBtns">              
                <div className="midRight">
                <Link to="/todo" className="option">
                  <div className="activityOption">
                    <div className="optionIcon">
                      <FontAwesomeIcon icon={faListCheck} />
                    </div>
                    <h1>Todo List</h1>
                    {/* <p>
                      Manage your tasks, write them down and to keep track of
                      their due date and when to do them!
                    </p> */}
                  </div>
                </Link>
                <Link className="option" to="/timer">
                  <div className="activityOption">
                    <div className="optionIcon">
                      <FontAwesomeIcon icon={faClock} />
                    </div>
                    <h1>Activity Timer</h1>
                    {/* <p>
                      Keep track of your time management! setup how much time
                      you need for a certain activity and time for break.
                    </p> */}
                  </div>
                </Link>
                <Link to="/settings" className="option">
                  <div className="activityOption">
                    <div className="optionIcon">
                      <FontAwesomeIcon icon={faGear} />
                    </div>
                    <h1>Settings</h1>
                    {/* <p>
                      Configure the user Settings, such as User customization
                      and Websites being blocked
                    </p> */}
                  </div>
                </Link>
                <Link className="option" to="/schedule">
                  <div className="activityOption">
                    <div className="optionIcon">
                      <FontAwesomeIcon icon={faCalendarDays} />
                    </div>
                    <h1>Set Schedule</h1>
                    {/* <p>
                      Track down your schedule ahead of time. Given with a
                      calendar, write down your upcoming events!
                    </p> */}
                  </div>
                </Link>
              </div></div>
            </div>
            <div className="homeRight">
            <div className="mainLeft">
            <h1>It is currently...</h1>
            <Clock
              secondRatio={secondRatio}
              minuteRatio={minuteRatio}
              hourRatio={hourRatio}
            />
            <div className="dateToday">
              <h1>{formatDate(currentDate)}</h1>
            </div>
            <div className="timeToday">
              <h3>{currentTime}</h3>
            </div>
            <div className="clockButtons">
                <div className="learnMore"></div>
                <div className="aboutUs"></div>
            </div>
          </div>
            </div>
        </div>
    </div>
  )
}
