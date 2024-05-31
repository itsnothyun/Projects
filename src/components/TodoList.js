import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      if (editIndex !== null) {
        const updatedTodos = todos.map((todo, index) =>
          index === editIndex ? { ...todo, text: inputValue.trim() } : todo
        );
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        setTodos([...todos, { text: inputValue.trim(), completed: false }]);
      }
      setInputValue('');
      setError('');
    } else {
      setError('Please enter a todo.');
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleRemoveTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    if (editIndex !== null) {
      setEditIndex(null);
      setInputValue('');
    }
  };

  const handleEditTodo = (index) => {
    setInputValue(todos[index].text);
    setEditIndex(index);
  };

  const handleToggleComplete = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const handleCheckAll = () => {
    const allCompleted = todos.every((todo) => todo.completed);
    const updatedTodos = todos.map((todo) => ({
      ...todo,
      completed: !allCompleted,
    }));
    setTodos(updatedTodos);
  };

  const handleRemoveAll = () => {
    const confirmDelete = window.confirm('Are you sure you want to remove all todos?');
    if (confirmDelete) {
      setTodos([]);
    }
  };

  return (
    <div className="todo-container">
      <h1>Todo List</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a new todo"
        />
        <button onClick={handleAddTodo}>
          {editIndex !== null ? 'Update Todo' : 'Add Todo'}
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? 'completed' : ''}>
            <div>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(index)}
              />
              <span className={todo.completed ? 'completed-text' : ''}>
                {todo.text}
              </span>
            </div>
            <div>
              <button onClick={() => handleEditTodo(index)} disabled={todo.completed}>
                Edit
              </button>
              <button onClick={() => handleRemoveTodo(index)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <div>
        <button className="check-all" onClick={handleCheckAll}>
          {todos.every((todo) => todo.completed) ? 'Uncheck All' : 'Check All'}
        </button>
        <button className="remove-all" onClick={handleRemoveAll}>Remove All</button>
      </div>
    </div>
  );
};

export default TodoList;