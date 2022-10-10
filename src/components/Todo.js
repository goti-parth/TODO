import React, { useState } from "react";
import "../css/Todo.css";

function Todo({ todo, remove, update, toggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(todo.task);

  const handleClick = e => {
    remove(e.target.id);
  };
  const toggleFrom = () => {
    setIsEditing(!isEditing);
  };
  const handleUpdate = e => {
    e.preventDefault();
    update(todo.id, task);
    toggleFrom();
  };
  const handleChange = e => {
    setTask(e.target.value);
  };
  const toggleCompleted = e => {
    toggleComplete(e.target.id);
  };

  let result;
  if (isEditing) {
    result = (
      <div className="Todo">
        <form data-testid="edit-todo" className="Todo-edit-form" onSubmit={handleUpdate}>
          <input data-testid="edit-input" onChange={handleChange} value={task} type="text" />
          <button data-testid="btn-save-task">Save</button>
        </form>
      </div>
    );
  } else {
    result = (
      <div data-testid="todo-item" className="Todo">
        <div className="Todo-name">
            <input data-testid="check" id={todo.id} type="checkbox" checked={todo.completed} onChange={toggleCompleted}/>
            <li data-testid={`id-${todo.id}`}
            id={todo.id}
            className={todo.completed ? "Todo-task completed" : "Todo-task"}
            >
            {todo.task}
            </li>
        </div>
        <div className="Todo-buttons">
          <button data-testid="btn-edit-task" onClick={toggleFrom}>Edit</button>
          <button data-testid="delete-task" id={todo.id} onClick={handleClick}>Delete</button>
        </div>
      </div>
    );
  }
  return result;
}

export default Todo;
