import React, { ReactNode, useState, useReducer } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import TodoReducer from "./components/TodoReducer";

function App() {
  //useState钩子，用于跨组件修改和使用todo的值
  const [todo, setTodo] = useState<string>("");
  // const [todos, setTodos] = useState<Todo[]>([]);
  const [state, dispatch] = useReducer(TodoReducer, []);

  console.log(state);
  return (
    <>
      <div className="text-4xl m-2 text-center text-white">TASKIFY</div>
      <InputField
        todo={todo}
        setTodo={setTodo}
        handleAdd={(e) => {
          e.preventDefault();
          dispatch({ type: "add", payload: todo });
          setTodo("");
        }}
      ></InputField>
      <TodoList
        todos={state}
        // setTodos={setTodos}
        dispatch={dispatch}
      ></TodoList>
    </>
  );
}

export default App;
