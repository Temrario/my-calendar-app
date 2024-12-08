import React, { useState } from 'react';
import './App.css';
import Calendar from './components/Calendar';
import EventForm from './components/EventForm';

function App() {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  return (
    <div className="App">
      <Calendar />
      {showForm && selectedDate && (
        <EventForm date={selectedDate} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}

export default App;
