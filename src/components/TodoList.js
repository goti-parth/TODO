import React, { useState } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";
import "../css/TodoList.css";

function TodoList() {
  const [todos, setTodos] = useState([]);

  const createTask = newTodo => {
    setTodos([...todos, newTodo]);
  };

  const removeTask = id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const updateTask = (id, updtedTask) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: updtedTask };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const onToggle = id => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const todosList = todos.map(todo => (
    <Todo
      toggleComplete={onToggle}
      update={updateTask}
      remove={removeTask}
      key={todo.id}
      todo={todo}
    />
  ));

  return (
    <div data-testid="todos" className="TodoList">
      <h1>Todo List</h1>
      <NewTodoForm createTodo={createTask} />
      <ul data-testid="todo-list">{todosList}</ul>
    </div>
  );
}

export default TodoList;
