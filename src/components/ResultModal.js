import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

function ResultModal({ isOpen, onRequestClose, todos, onEdit, onSave, onRemove }) {
  const [editingTodo, setEditingTodo] = useState(null);
  const [editValue, setEditValue] = useState('');

  const handleEditTodo = (id) => {
    setEditingTodo(id);
    const todoToEdit = todos.find((todo) => todo.id === id);
    setEditValue(todoToEdit.text);
  };

  const handleSaveTodo = (id) => {
    onSave(id, editValue);
    setEditingTodo(null);
  };

  const handleRemoveTodo = (id) => {
    onRemove(id);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="To-Do List Results"
    >
      <h2>To-Do List</h2>
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
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
}

export default ResultModal;
