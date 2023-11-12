import React, { ReactNode, useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./model";
import TodoList from "./components/TodoList";
function App() {
  //useState钩子，用于跨组件修改和使用todo的值
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      //获取当前的todos，创建一个副本，然后追加一个新的，再赋值给todos
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };
  console.log(todos);
  return (
    <>
      <div className="text-4xl m-2 text-center text-white">TASKIFY</div>
      <InputField
        todo={todo}
        setTodo={setTodo}
        handleAdd={handleAdd}
      ></InputField>
      <TodoList todos={todos} setTodos={setTodos}></TodoList>
    </>
  );
}

export default App;
