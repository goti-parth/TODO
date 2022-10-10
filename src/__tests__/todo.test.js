import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';
import Todo from '../components/Todo'
import uuid from "uuid";

afterEach(()=>{
    cleanup();
});

test('renders initial app', () => {

    render(<TodoList />);

    const todo = screen.getByTestId("todos");
    const inputElement = screen.getByTestId("add-input");
    const addTaskBtn = screen.getByTestId("btn-add-task");
    const todoItems = screen.queryAllByTestId("todo-item");


    //Render app
    expect(todo).toBeInTheDocument();

    //Rendern input with empty initial value
    expect(inputElement.value).toBe('');

    //Render Add Task button
    expect(addTaskBtn).toBeInTheDocument();

    //Initially list should be empty
    expect(todoItems.length).toBe(0);
  
});

test('creates a new task', () => {
    render(<TodoList />);
  
    // Create the todo.
    const inputElement = screen.getByTestId('add-input');
    const addButtonElement = screen.getByTestId('btn-add-task');
  
    fireEvent.change(inputElement, { target: { value: 'Task 1' } });
    fireEvent.click(addButtonElement);
  
    const todo = screen.getByTestId('todo-list');
    const todoItems = screen.queryAllByTestId("todo-item");
    const todoNameElement = todo.lastElementChild.firstChild;
  
    // The todo should be create and name should be correct"
    expect(todoNameElement.textContent).toBe('Task 1');
  
    // There should be 1 todo in the document.
    expect(todoItems.length).toBe(1);

    // The input field should be blank.
    expect(inputElement.value).toBe('');
  });


test('renders task list', () => {
    const todo = { id: uuid(), task: "Task 1", completed: false };
    render(<Todo todo={todo}/>);
    
    const todoItem = screen.getByTestId(`id-${todo.id}`);
    expect(todoItem).toBeInTheDocument();
    expect(todoItem).toHaveTextContent("Task 1");
});

test('deletes a task', () => {

    render(<TodoList />);
    
    // Create the todo.
    const inputElement = screen.getByTestId('add-input');
    const addButtonElement = screen.getByTestId('btn-add-task');
  
    fireEvent.change(inputElement, { target: { value: 'Task 1' } });
    fireEvent.click(addButtonElement);

    // Click the delete button.
    const todoDeleteButton = screen.getByTestId(`delete-task`);
    fireEvent.click(todoDeleteButton);
  
    const todoItems = screen.queryAllByTestId("todo-item");
  
    // There should be 0 todos found in the document.
    expect(todoItems.length).toBe(0);
  });

  test('edit task', () => {
    render(<TodoList />);
  
    // Create the todo.
    const inputElement = screen.getByTestId('add-input');
    const addButtonElement = screen.getByTestId('btn-add-task');
  
    fireEvent.change(inputElement, { target: { value: 'Task 1' } });
    fireEvent.click(addButtonElement);

    const todo = screen.getByTestId('todo-list');
    const todoNameElement = todo.lastElementChild.firstChild;

    // The todo should be create and name should be correct.
    expect(todoNameElement.textContent).toBe('Task 1');


    //On click of edit button, task should be editable.
    const editButtonElement = screen.getByTestId('btn-edit-task');
    fireEvent.click(editButtonElement);

    const editsection = screen.getByTestId('edit-todo');
    expect(editsection).toBeInTheDocument();

    // edit the task.
    const editInputElement = screen.getByTestId('edit-input');
    const saveButtonElement = screen.getByTestId('btn-save-task');
  
    fireEvent.change(editInputElement, { target: { value: 'Task 2' } });
    fireEvent.click(saveButtonElement);

    const editedTask = screen.getByTestId('todo-list');
    const editedElement = editedTask.lastElementChild.firstChild;
  
    expect(editedElement.textContent).toBe('Task 2');
  });

  test('check/uncheck task', () => {
    render(<TodoList />);
  
    // Create the todo.
    const inputElement = screen.getByTestId('add-input');
    const addButtonElement = screen.getByTestId('btn-add-task');
  
    fireEvent.change(inputElement, { target: { value: 'Task 1' } });
    fireEvent.click(addButtonElement);

    const todo = screen.getByTestId('todo-list');
    const todoNameElement = todo.lastElementChild.firstChild;

    // The todo should be create and name should be correct.
    expect(todoNameElement.textContent).toBe('Task 1');

    const checkBoxElement = screen.getByTestId('check');

    //By default task should be uncheck
    expect(checkBoxElement.checked).toBe(false);

    //on click it should be mark as completed
    fireEvent.click(checkBoxElement);

    expect(checkBoxElement.checked).toBe(true);

    //on click it should be unckeck
    fireEvent.click(checkBoxElement);

    expect(checkBoxElement.checked).toBe(false);
  });


  test('error on empty task', () => {
    render(<TodoList />);
  
    const addButtonElement = screen.getByTestId('btn-add-task');
    
    //try to create empty task
    fireEvent.click(addButtonElement);
    const errorElement = screen.getByTestId('error');

    expect(errorElement).toBeInTheDocument();
  });

