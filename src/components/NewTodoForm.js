import React, { useState } from "react";
import uuid from "uuid";
import "../css/NewTodoForm.css";

function NewTodoForm({createTodo }) {
  const [name, setTask] = useState("");
  const [error, setError] = useState(false);

  const handleChange = e => {
    if(e.target.value.trim()){
      setError(false);
    }
    setTask(e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!name) {
      setError(true);
      return;
    }

    const newTodo = { id: uuid(), task: name ? name.trim() : "", completed: false };
    createTodo(newTodo);
    setTask("");
  };

  return (
    <>
      <form data-testid="add-todo" className="NewTodoForm" onSubmit={handleSubmit}>
        <input
          data-testid="add-input"
          value={name}
          onChange={handleChange}
          type="text"
          placeholder="Create task"
        />
        <button data-testid="btn-add-task">Add Task</button>
      </form>
      {error && <div data-testid="error" className="error-msg">Please enter the task</div>}
    </> 
  );
}

export default NewTodoForm;
