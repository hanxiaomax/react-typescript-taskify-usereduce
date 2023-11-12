[React & TypeScript - Course for Beginners
](https://youtu.be/FJDVKeh7RJI?si=izl3fbSHua6EigOv)

with usereduce example


Key takeway

### 1. write a reducer called TodoReducer to handle the dispatch

```ts
import { Todo } from "../model";
export type Action =
  | { type: "add"; payload: string }
  | { type: "remove"; payload: Todo }
  | { type: "done"; payload: Todo }
  | { type: "edit"; payload: Todo };

const TodoReducer = (state: Todo[], action: Action) => {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: Date.now(), todo: action.payload, isDone: false },
      ];
    case "edit":
      return state.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, todo: action.payload.todo }
          : todo
      );
    case "remove":
      return state.filter((todo) => todo.id !== action.payload.id);
    case "done":
      return state.map((todo) =>
        todo.id === action.payload.id ? { ...todo, isDone: !todo.isDone } : todo
      );

    default:
      return state;
  }
};

export default TodoReducer;

```

### 2. dispatch in the onclick function and send the type and payload (here I use Todo as payload's type instead of number shown in the video)

```ts
<span onClick={() => dispatch({ type: "remove", payload: todo })}>
  <AiFillDelete></AiFillDelete>
</span>
```

### 3. pass the dispatch function instead of setTodo and other function fom App.tsx all the way down to the SingleTodoWithUseReduce and use it

App.tsx
```ts
      <TodoList
        todos={state}
        // setTodos={setTodos}
        dispatch={dispatch}
      ></TodoList>
```
TodoList.tsx
```ts

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

```

I am new to React, correct me if I am wrong 
