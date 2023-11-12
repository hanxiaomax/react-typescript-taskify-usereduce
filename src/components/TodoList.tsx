import React from "react";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import SingleTodoWithUseReduce from "./SingleTodoWithUseReduce";

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList = ({ todos, setTodos }: Props) => {
  return (
    <div className="flex flex-wrap justify-center">
      {todos.map((t) => (
        <SingleTodo
          todo={t}
          key={t.id}
          todos={todos}
          setTodos={setTodos}
        ></SingleTodo>
        // <SingleTodoWithUseReduce
        //   todo={t}
        //   key={t.id}
        //   todos={todos}
        //   setTodos={setTodos}
        // ></SingleTodoWithUseReduce>
      ))}
    </div>
  );
};

export default TodoList;
