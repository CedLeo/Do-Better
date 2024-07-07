import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faHouse, faGear, faClock, faCalendarDays, faListCheck } from "@fortawesome/free-solid-svg-icons";
import {  NavLink } from 'react-router-dom';


export default function Navbar() {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  return (  
    <div className="NavbarWrapper">
      <div className="navbar">
        <div className="logo">
           <a href="/">
            <img src="/blklogo.png" alt="" className="logopic"/>  
            </a>
        </div>
        <ul className="navbarlist">
          <li className="navbarItem navIcons">
             <NavLink exact to="/home" className='navLink' activeClassName="activeNavLink">  
              <FontAwesomeIcon icon={faHouse} />
             </NavLink>  
          </li>
          <li className="navbarItem navIcons">
             <NavLink to="/" className='navLink' activeClassName="activeNavLink" > 
              <FontAwesomeIcon icon={faListCheck} />
             </NavLink>  
          </li>
          <li className="navbarItem navIcons">
             <NavLink to="/schedule" className='navLink' activeClassName="activeNavLink">  
              <FontAwesomeIcon icon={faCalendarDays} />
             </NavLink> 
          </li>
          <li className="navbarItem navIcons">
             <NavLink to="/timer" className='navLink' activeClassName="activeNavLink">  
              <FontAwesomeIcon icon={faClock} />
             </NavLink> 
          </li>
          <li className="navbarItem navIcons">
             <NavLink to="/settings" className='navLink' activeClassName="activeNavLink">  
              <FontAwesomeIcon icon={faGear} />
             </NavLink>  
          </li>
        </ul>
        <div className="navIcons" >
          <FontAwesomeIcon icon={faCircleInfo} className="infoIcon" id='contactBtn' onClick={toggleModal}/>
        </div>
      </div>
      {modalOpen && (
        <div className="modalBackground" onClick={toggleModal}>
          <div className="modalContent">
            <h2 className='userManualTitle'>User Manual</h2>
            <div className="userManualContent">

<h1>	How to use the Task Manager</h1>

<p>
1. Navigate the task manager icon in the home screen.
<br />
2. Start by typing the name of the task you have in mind.
<br />

3. Proceed to set the deadline.
<br />

4. Next, select the priority level for the task. You have three options: priority 1-3 with 3 being the highest priority.
<br />

5. Once you've entered all the task details and selected the priority level, click on the "Add Task" button to save the task.
<br />

6. You can review your tasks after, edit them if necessary, mark them as completed when done, or delete them if they're no longer relevant.</p>

<h1>How to use the Timer</h1>
	
<p>
1. Navigate the timer icon in the home screen.
<br />
2. Start by typing the number of minutes you want the timer to run.
<br />
3. Next, type the number of seconds you want to add to the timer duration. If you don't want to specify seconds, you can leave this field blank or enter '0'.
<br />
4. After setting the timer duration, you can enter the purpose or description of the timer.
<br />
5. Once you've entered the timer duration and purpose, click on the "Start" button to initiate the timer countdown.
<br />
6. If you need to pause the timer, click on the "Pause" button. This will temporarily halt the countdown.
<br />
7. To stop the timer before it completes its countdown, click on the"Reset" button. This will reset the timer to its initial duration.</p>

<h1>How to use the Calendar</h1>

<p>
  1. Navigate the Calendar icon in the home screen.
  <br />

2. Click on the desired date to open the event creation interface.
<br />

3. In the event creation interface, enter the event title and description.
<br />

4. Click submit to save
<br />

5. To edit the date, you can drag and drop the event to the desired date</p>

<h1>How to block/unblock websites</h1>

<p>
  1. Navigate the Settings icon in the home screen.
  <br />

2. Copy the URL of the desired website you want to block.
<br />

3. Click the delete icon to unblock the desired website.</p>


            </div>
          </div>
        </div>
      )}
    </div>
  );
}
