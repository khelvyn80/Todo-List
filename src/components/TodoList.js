
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo } from '../redux/actions/todosActions';
import './todolist.css'

function TodoList() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    const text = prompt('Enter a new to-do:');
    if (text) {
      dispatch(addTodo(text));
    }
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  return (
    <div className="container">
      <h2>To-Do List</h2>
      <button onClick={handleAddTodo}>Add To-Do</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}{' '}
            <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
