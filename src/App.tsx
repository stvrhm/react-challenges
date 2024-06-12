import * as React from "react";
import "./App.css";

interface TodoFormElements extends HTMLFormControlsCollection {
  todo: HTMLInputElement;
}

interface TodoForm extends HTMLFormElement {
  readonly elements: TodoFormElements;
}

function App() {
  const [todos, setTodos] = React.useState<Array<string>>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent<TodoForm>) {
    event.preventDefault();
    const value = event.currentTarget.elements.todo.value;

    if (value.length > 0) {
      setTodos([...todos, value]);
      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.focus();
      }
    }
  }

  function removeTodo(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLButtonElement;
    const value = +target.value;
    //const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    const newTodos = todos.filter((_, index) => index != value);
    setTodos(newTodos);
    if (inputRef.current) inputRef.current.focus();
  }

  return (
    <div className="container">
      <h1>Todo</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newTodo">
          <input ref={inputRef} type="text" id="todo" placeholder="Add city" />
          <button type="submit">Add</button>
        </label>
      </form>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              {todo}{" "}
              <button value={index} onClick={(e) => removeTodo(e)}>
                x
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No Todos</p>
      )}
    </div>
  );
}

export default App;
