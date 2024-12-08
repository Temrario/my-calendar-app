import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addEvent } from '../redux/actions';
import EventForm from './EventForm';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(11); // Грудень (місяць 0-indexed)
  const [currentYear, setCurrentYear] = useState(2024); // Поточний рік
  const events = useSelector(state => state.events);
  const dispatch = useDispatch();

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setShowForm(true);
  };

  const handleAddEvent = (event) => {
    dispatch(addEvent(event));
    setShowForm(false); // Закрити форму після додавання
  };

  // Перевірка, чи є подія на конкретному дні
  const isEventDay = (date) => {
    return events.some(event => event.date === date);
  };

  // Генерація днів для місяця (для вибраного місяця)
  const getDaysInMonth = (month) => {
    const daysInMonth = new Date(currentYear, month + 1, 0).getDate(); // кількість днів у місяці
    return Array.from({ length: daysInMonth }, (_, i) => i + 1);
  };

  // Отримуємо перший день місяця, щоб визначити, з якого дня тижня він починається
  const getFirstDayOfMonth = (month) => {
    const date = new Date(currentYear, month, 1);
    return date.getDay(); // Повертає день тижня (0 - Неділя, 1 - Понеділок, ..., 6 - Субота)
  };

  // Форматування дати для підсвічування дня
  const formatDate = (day) => {
    return `${currentYear}-${(currentMonth + 1).toString().padStart(2, '0')}-${day < 10 ? '0' : ''}${day}`;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11); // Перехід з січня на грудень
      setCurrentYear(prevYear => prevYear - 1); // Зменшення року
    } else {
      setCurrentMonth((prevMonth) => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0); // Перехід з грудня на січень
      setCurrentYear(prevYear => prevYear + 1); // Збільшення року
    } else {
      setCurrentMonth((prevMonth) => prevMonth + 1);
    }
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth);
  const weekDays = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

  // Створюємо масив, де додаються порожні елементи для заповнення початку місяця
  const daysArray = new Array(firstDayOfMonth).fill(null).concat(daysInMonth);

  return (
    <div>
      <h1>Календар</h1>

      <div className="month-navigation">
        <button onClick={handlePrevMonth}>&#8592;</button> {/* Стрілка вліво */}
        <h2>{new Date(currentYear, currentMonth).toLocaleString('uk-UA', { month: 'long' })} {currentYear}</h2>
        <button onClick={handleNextMonth}>&#8594;</button> {/* Стрілка вправо */}
      </div>

      {/* Відображення днів тижня */}
      <div className="weekdays">
        {weekDays.map((day, index) => (
          <div key={index} className="weekday">
            {day}
          </div>
        ))}
      </div>

      <div className="calendar">
        {daysArray.map((day, index) => (
          <button
            key={index}
            onClick={() => day && handleDateClick(formatDate(day))}
            className={day && isEventDay(formatDate(day)) ? 'event-day' : ''}
            disabled={!day}
          >
            {day || ''}
          </button>
        ))}
      </div>

      {showForm && selectedDate && (
        <EventForm date={selectedDate} onClose={() => setShowForm(false)} />
      )}

      <h2>Події</h2>
      <ul>
        {events.map((event, index) => (
          <li key={index}>{event.date}: {event.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
