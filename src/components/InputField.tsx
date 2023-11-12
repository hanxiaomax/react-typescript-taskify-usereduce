import React, { useRef } from "react";
interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField = ({ todo, setTodo, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <form
        className="flex justify-center "
        onSubmit={(e) => {
          handleAdd(e);
          inputRef.current?.blur();
        }}
      >
        <input
          ref={inputRef}
          className="flex relative w-full m-6 p-10 shadow-lg shadow-blue-300 rounded-3xl text-2xl"
          placeholder="Enter a task"
          value={todo}
          //当input改变时，将值通过useState的钩子函数setTodo设置到todo
          //以此实现修改value
          onChange={(e) => setTodo(e.target.value)}
        ></input>
        <button
          type="submit"
          className="absolute right-0 w-16 h-16 m-12 shadow-lg bg-blue-400 text-white rounded-full hover:bg-blue-500"
        >
          <span className="text-lg">Go</span>
        </button>
      </form>
    </div>
  );
};

export default InputField;
