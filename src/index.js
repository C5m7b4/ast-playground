console.log("ready to start coding");
import encours from "./encours";
import { rootReducer } from "./reducers";
import Header from "./components/Header";

const reducers = {
  "load-router-page": (staet, payload) => {
    return state;
  },
};

// const initialState = {
//   edit: null,
//   todos: ["Take out the trash", "Cook some wings"],
//   editing: null,
//   oldEdit: null,
//   updatedEdit: null,
//   title: "Hello peeps",
//   style: { color: "blue" },
// };

// const reducers = {
//   "load-router-page": (state, payload) => {
//     return state;
//   },
//   "update-title": (state) => {
//     return {
//       ...state,
//       title: "this is updated",
//       style: {
//         color: "red",
//       },
//     };
//   },
//   "update-new-todo": (state, payload) => {
//     const newState = {
//       ...state,
//       edit: payload,
//     };
//     console.log("new State - update-todo", newState);
//     return newState;
//   },
//   "add-todo": (state) => {
//     const newState = {
//       ...state,
//       todos: [...state.todos, state.edit],
//       edit: null,
//     };
//     console.log("new State add-todo", newState);
//     return newState;
//   },
//   "remove-todo": (state, payload) => {
//     const todosCopy = [...state.todos];
//     const idx = todosCopy.indexOf(payload);
//     todosCopy.splice(idx, 1);
//     return {
//       ...state,
//       todos: todosCopy,
//     };
//   },
//   "set-editing": (state, payload) => {
//     const newState = {
//       ...state,
//       editing: payload,
//       oldEdit: payload,
//       updatedEdit: payload,
//     };
//     console.log("newState - set-editing", newState);
//     return newState;
//   },
//   "cancel-edit": (state) => {
//     return {
//       ...state,
//       edit: null,
//       editing: null,
//     };
//   },
//   "update-todo": (state, payload) => {
//     const newState = {
//       ...state,
//       updatedEdit: payload,
//     };
//     console.log("newState", newState);
//     return newState;
//   },
//   "finish-editing": (state) => {
//     const oldIdx = state.todos.indexOf(state.oldEdit);
//     const todos = [...state.todos];
//     todos.splice(oldIdx, 1, state.updatedEdit);

//     const newState = {
//       ...state,
//       todos,
//       editing: null,
//       oldEdit: null,
//       updatedEdit: null,
//     };

//     return newState;
//   },
// };
const root = document.getElementById("app");

const App = (state, emit) => {
  return (
    <div className="wrapper">
      <div id="header">
        <Header />
      </div>
      <div id="content" className="content"></div>
    </div>
  );
};

encours.createApp({ reducers, view: App }).mount(root);
