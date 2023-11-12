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
