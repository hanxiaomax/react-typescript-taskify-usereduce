import React, { useEffect, useState, useRef } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "../model";
interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    //最终会返回一个新的数组，其中id匹配的todo的idDone属性会被取反
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo, //对象扩展运算符复制todo原有的属性
              isDone: !todo.isDone,
            }
          : todo
      )
    );
  };
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
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
    <>
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
          <span onClick={() => handleDone(todo.id)}>
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
          <span onClick={() => handleDelete(todo.id)}>
            <AiFillDelete></AiFillDelete>
          </span>
        </div>
      </form>
    </>
  );
};

export default SingleTodo;
