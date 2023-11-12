import { Todo } from "../model";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import TodoReducer from "./TodoReducer";
import { useState, useEffect, useRef } from "react";
import { useReducer } from "react";

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodoWithUseReduce = ({ todo, todos, setTodos }: Props) => {
  const [state, dispatch] = useReducer(TodoReducer, []);
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };
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
        onSubmit={(e) => handleEdit(e, todo.id)}
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
          <span onClick={() => dispatch({ type: "done", payload: todo.id })}>
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
          <span onClick={() => dispatch({ type: "remove", payload: todo.id })}>
            <AiFillDelete></AiFillDelete>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SingleTodoWithUseReduce;
