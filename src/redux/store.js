import { createStore } from 'redux';

// Дефолтний стан
const initialState = {
  events: [],
};

// Редуктор для управління подіями
function calendarReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_EVENT':
      return {
        ...state,
        events: [...state.events, action.payload],
      };
    default:
      return state;
  }
}

// Створення store
const store = createStore(calendarReducer);

export default store;
