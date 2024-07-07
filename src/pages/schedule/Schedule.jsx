import React, { useState, useEffect } from 'react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import FullCalendar from '@fullcalendar/react';
import { v4 as uuidv4 } from 'uuid';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons"; // Update icon import
import './schedule.css';

export default function Schedule() {
  const [selectedDateTimeRange, setSelectedDateTimeRange] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      setEvents(JSON.parse(storedEvents));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handleDateRangeSelect = (arg) => {
    setSelectedDateTimeRange({ start: arg.start, end: arg.end });
    setShowEventModal(true);
  };

  const handleSubmit = () => {
    const newEvent = {
      id: uuidv4(),
      title: eventName,
      description: eventDescription,
      start: selectedDateTimeRange.start,
      end: selectedDateTimeRange.end,
      allDay: false,
      color: selectedColor,
    };
    setEvents([...events, newEvent]);
    setShowEventModal(false);
    setEventName('');
    setEventDescription('');
    setSelectedColor(null);
  };

  const handleDelete = (eventId) => {
    setEvents(events.filter(event => event.id !== eventId));
  };

  const handleClearLocalStorage = () => {
    localStorage.removeItem('events');
    setEvents([]);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <div className='eventObject' style={{ backgroundColor: eventInfo.event.backgroundColor }}>
        <h1 className='eventTitle'>{eventInfo.event.title}</h1>
        <p className='eventDesc'>{eventInfo.event.extendedProps.description}</p>
        <button className='delButton' onClick={() => handleDelete(eventInfo.event.id)}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    );
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  return (
    <div className="container">
      <div className="calendarWrapper">
        <div className="calendarContent">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView={'dayGridMonth'}
            headerToolbar={{
              start: 'today prev,next',
              center: 'title',
              end: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            height={'90vh'}
            selectable={true}
            select={handleDateRangeSelect}
            events={events}
            editable={true}
            eventContent={renderEventContent}
          />
        </div>
        
      </div>
      {showEventModal && (
        <div className="eventModalBackground">
          <div className="eventModal">
            <h2>What would the upcoming event be?</h2>
            <p>Selected Time Range: {selectedDateTimeRange ? `${selectedDateTimeRange.start.toLocaleString()} - ${selectedDateTimeRange.end.toLocaleString()}` : ''}</p>
            <div className="formGroup">
              <input type="text" id="eventName" value={eventName} onChange={(e) => setEventName(e.target.value)} placeholder='Event Name...' />
            </div>

            <div className="formGroup">
              <textarea id="eventDescription" rows="3" value={eventDescription} onChange={(e) => setEventDescription(e.target.value)} placeholder='Event Description...'></textarea>
            </div>
            <ul className='chooseColor'>
  <li className={`colorOption ${selectedColor === '#007bff' ? 'selectedColor' : ''}`} style={{ backgroundColor: '#007bff' }} onClick={() => handleColorSelect('rgba(0, 123, 255, 0.5)')}></li>
  <li className={`colorOption ${selectedColor === '#ff5151' ? 'selectedColor' : ''}`} style={{ backgroundColor: '#ff5151' }} onClick={() => handleColorSelect('rgba(255, 81, 81, 0.5)')}></li>
  <li className={`colorOption ${selectedColor === '#4ff16a' ? 'selectedColor' : ''}`} style={{ backgroundColor: '#4ff16a' }} onClick={() => handleColorSelect('rgba(79, 241, 106, 0.5)')}></li>
  <li className={`colorOption ${selectedColor === '#282829' ? 'selectedColor' : ''}`} style={{ backgroundColor: '#282829' }} onClick={() => handleColorSelect('rgba(40, 40, 41, 0.5)')}></li>
  <li className={`colorOption ${selectedColor === '#a1268d' ? 'selectedColor' : ''}`} style={{ backgroundColor: '#a1268d' }} onClick={() => handleColorSelect('rgba(161, 38, 141, 0.5)')}></li>
</ul>

            <button onClick={handleSubmit}>Submit</button>
            <button className='cancelBtn' onClick={() => setShowEventModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}
