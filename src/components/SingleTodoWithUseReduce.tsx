import { Todo } from "../model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import { Action } from "./TodoReducer";

interface Props {
  todo: Todo;
  todos: Todo[];
  dispatch: React.Dispatch<Action>;
}

const SingleTodoWithUseReduce = ({ todo, todos, dispatch }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  //当edit变化时让光标focus到输入框
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <div>
      <form
        //表格的onSubmit会被submit类型的button或回车触发
        className="flex sm:basis-1/2 md:basis-1/2 lg:basis-1/3 bg-gradient-to-r from-cyan-500 to-blue-500 mx-4 my-2 p-8 text-xl shadow-xl rounded-lg hover:shadow-2xl hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-200"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch({ type: "edit", payload: { ...todo, todo: editTodo } });
          setEdit(false);
        }}
      >
        {edit ? (
          <input
            className=" border border-blue-500"
            ref={inputRef}
            value={editTodo}
            onChange={(e) => setEditTodo(e.target.value)}
          />
        ) : todo.isDone ? (
          <s className="px-4 break-normal">{todo.todo}</s>
        ) : (
          <span className="px-4 break-normal">{todo.todo}</span>
        )}

        <div className="flex flex-row w-full text-xl justify-end space-x-2">
          <span onClick={() => dispatch({ type: "done", payload: todo })}>
            <MdDone></MdDone>
          </span>
          <span
            onClick={() => {
              if (!edit && !todo.isDone) {
                setEdit(!edit);
              }
            }}
          >
            <AiFillEdit></AiFillEdit>
          </span>
          <span onClick={() => dispatch({ type: "remove", payload: todo })}>
            <AiFillDelete></AiFillDelete>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SingleTodoWithUseReduce;
