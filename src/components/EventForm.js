import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEvent } from '../redux/actions';

const EventForm = ({ date, onClose }) => {
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const event = {
      date,
      description,
    };
    dispatch(addEvent(event));
    onClose(); // Закрити форму після додавання
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Додати подію для {date}</h2>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Опис події"
      />
      <button type="submit">Додати подію</button>
    </form>
  );
};

export default EventForm;
