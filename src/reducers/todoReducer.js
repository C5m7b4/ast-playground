import * as actions from "../actions/todoActions";

const initialState = {
  edit: null,
  todos: ["Take out the trash", "Cook some wings"],
  editing: null,
  oldEdit: null,
  updatedEdit: null,
};

const todosReducer = ({ state: initialState, action }) => {
  switch (action.type) {
    case actions.UPDATE_NEW_TODO:
      return {
        ...state,
        edit: action.payload,
      };
    case actions.ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        edit: null,
      };
    case actions.REMOVE_TODO:
      const todosCopy = [...state.todos];
      const idx = todosCopy.indexOf(action.payload);
      todosCopy.splice(idx, 1);
      return {
        ...state,
        todos: todosCopy,
      };
    default:
      return state;
  }
};

export default todosReducer;
