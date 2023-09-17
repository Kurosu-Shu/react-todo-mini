
import { useState } from 'react';

const App = () => {

  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([
    {
      id: Math.random(),
      taskName: "Task 1",
      isComplete: false,
    },
    {
      id: Math.random(),
      taskName: "Task 2",
      isComplete: true,
    }
  ]);

  const handleAddTask = () => {
    setTodos(
      [
        ...todos,
        {
          id: Math.random(),
          taskName: inputValue,
          isComplete: false,
        }

      ]
    );
    setInputValue("");
  }

  const handleTextInput = (e) => {
    setInputValue(e.target.value);
  }

  const onDoneById = (id) => {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            isComplete: !todo.isComplete
          }
        }
        return todo;
      });
    });
  }

  const onEditbyId = (id) => {
    let editTodo = todos.filter(todo => todo.id === id)
    setInputValue(editTodo[0].taskName);

  }

  const handleUpdateTask = (id) => {
    setTodos(prevTodos => {
      return prevTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            taskName: inputValue
          }
        }
        return todo;
      })
    })
    setInputValue("");
  };

  const handleFilter = (e) => {

    if (e.target.value === "complete") {

      setTodos(
        todos.filter(todo => todo.isComplete === true)

      );
    } else if (e.target.value === "unfinish") {
      setTodos(
        todos.filter(todo => todo.isComplete === false)
      );
    }
  }

  const onDeleteById = (id) => {
    setTodos(
      todos.filter(todo => todo.id !== id)
    )
  }

  return (
    <div>
      <input type="text" onChange={handleTextInput} value={inputValue} />
      <button onClick={handleAddTask}>Add Task</button>
      <select onChange={handleFilter}>
        <option value="all" selected>All</option>
        <option value="complete">Complete</option>
        <option value="unfinish">Unfinish</option>
      </select>
      <ul>
        {
          todos.map(todo => {
            return <li key={todo.id}>
              {todo.taskName} - {todo.isComplete ? "Done" : "Not Finished Yet"}
              &nbsp;
              <button onClick={() => onDoneById(todo.id)}>
                {todo.isComplete ? "Undo" : "Done"}
              </button>
              <button onClick={() => onEditbyId(todo.id)}>
                Edit
              </button>
              <button onClick={() => handleUpdateTask(todo.id)}>Update Task</button>
              <button onClick={() => onDeleteById(todo.id)}>
                Delete
              </button>
            </li>
          })
        }
      </ul>
    </div>
  );

}

export default App;