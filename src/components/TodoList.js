// src/components/TodoList.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, removeTodo, editTodo } from '../redux/actions/todosActions';
import ResultModal from './ResultModal';

function TodoList() {
  const todos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const [newTodo, setNewTodo] = useState('');
  const [editingTodo, setEditingTodo] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const handleAddTodo = () => {
    if (newTodo) {
      dispatch(addTodo(newTodo));
      setNewTodo('');
    }
  };

  const handleRemoveTodo = (id) => {
    dispatch(removeTodo(id));
  };

  const handleEditTodo = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditingTodo(id);
    setEditValue(todoToEdit.text);
  };

  const handleSaveTodo = (id) => {
    dispatch(editTodo(id, editValue));
    setEditingTodo(null);
  };

  const openResultModal = () => {
    setIsResultModalOpen(true);
  };

  const closeResultModal = () => {
    setIsResultModalOpen(false);
  };

  return (
    <div className="todo-list">
      <h2>To-Do List</h2>
      <div className="add-todo">
        <input
          type="text"
          placeholder="Enter a new to-do"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={handleAddTodo}>Add To-Do</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {editingTodo === todo.id ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => handleSaveTodo(todo.id)}>Save</button>
              </>
            ) : (
              <>
                {todo.text}
                <button onClick={() => handleEditTodo(todo.id)}>Edit</button>
              </>
            )}
            <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={openResultModal}>View Results</button> {/* Button to open the ResultModal */}
      <ResultModal
        isOpen={isResultModalOpen}
        onRequestClose={closeResultModal}
        todos={todos}
      />
    </div>
  );
}

export default TodoList;
