import encours from "../encours";

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

const TodoEditingItem = ({ props }) => {
  const { state, emit } = props;
  const handleCancel = () => {
    emit("cancel-edit");
  };

  const handleInput = (e) => {
    emit("update-todo", e.target.value);
  };

  const handleFinish = () => {
    emit("finish-editing");
  };
  return (
    <div className="todo-container">
      <input
        type="text"
        value={state.updatedEdit}
        onInput={(e) => handleInput(e)}
      />
      <button className="btn cancel" onClick={handleCancel}>
        Cancel
      </button>
      <button className="btn secondary" onClick={handleFinish}>
        Finish Editing
      </button>
    </div>
  );
};

const TodoItem = ({ props }) => {
  const { state, emit } = props;
  const { todo } = props;

  const handleClick = () => {
    emit("remove-todo", todo);
  };
  const handleEdit = () => {
    emit("set-editing", todo);
  };
  return (
    <div className="todo-container">
      <span className="todo">{todo}</span>
      <button className="btn third" onClick={handleEdit}>
        Edit
      </button>
      <button className="btn secondary" onClick={handleClick}>
        Done
      </button>
    </div>
  );
};

const TodoList = ({ props }) => {
  const { state, emit } = props;
  const editingItem = state.editing;
  return (
    <div style="width: 100%">
      {state.todos.map((todo, i) => {
        return editingItem == todo ? (
          <TodoEditingItem state={state} emit={emit} />
        ) : (
          <TodoItem state={state} emit={emit} todo={todo} />
        );
      })}
    </div>
  );
};

const Todos = ({ props }) => {
  const { state, emit } = props;
  const handleClick = () => {
    emit("add-todo");
  };
  const handleEdit = (e) => {
    emit("update-new-todo", e.target.value);
  };
  return (
    <div className="main">
      <h2 className="title">My Todo App</h2>
      <div style="display: flex; color: white">
        <input type="text" value={state.edit} onInput={(e) => handleEdit(e)} />
        <button id="btnAddTodo" className="btn primary" onClick={handleClick}>
          Add Todo
        </button>
      </div>

      <h3>Todo List</h3>
      <TodoList state={state} emit={emit} />
    </div>
  );
};

export default Todos;
