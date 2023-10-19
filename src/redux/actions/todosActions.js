// src/redux/actions/todosActions.js
export const addTodo = (text) => {
    return {
      type: 'ADD_TODO',
      payload: {
        id: Date.now(),
        text,
      },
    };
  };
  
  export const removeTodo = (id) => {
    return {
      type: 'REMOVE_TODO',
      payload: id,
    };
  };
  