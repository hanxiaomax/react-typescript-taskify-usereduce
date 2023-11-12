import React from "react";
import { Todo } from "../model";
import SingleTodoWithUseReduce from "./SingleTodoWithUseReduce";
import { Action } from "./TodoReducer";

interface Props {
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
}

const TodoList = ({ todos, dispatch }: Props) => {
  return (
    <div className="flex flex-wrap justify-center">
      {todos.map((t) => (
        <SingleTodoWithUseReduce
          todo={t}
          key={t.id}
          todos={todos}
          dispatch={dispatch}
        ></SingleTodoWithUseReduce>
      ))}
    </div>
  );
};

export default TodoList;
