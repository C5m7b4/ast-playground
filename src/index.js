console.log("ready");
import encours, { defineComponent } from "./encours";

const step1 = (
  <div className="main">
    <h1 style="color:red">Hello</h1>
    <button>Click me</button>
  </div>
);

//console.log(step1);
const root = document.getElementById("app");

const initialState = {
  edit: null,
  todos: ["Take out the trash", "Cook some wings"],
  editing: null,
  oldEdit: null,
  updatedEdit: null,
  title: "Hello peeps",
  style: { color: "blue" },
};

const reducers = {
  "update-title": (state) => {
    return {
      ...state,
      title: "this is updated",
      style: {
        color: "red",
      },
    };
  },
  "update-new-todo": (state, payload) => {
    const newState = {
      ...state,
      edit: payload,
    };
    console.log("new State - update-todo", newState);
    return newState;
  },
  "add-todo": (state) => {
    const newState = {
      ...state,
      todos: [...state.todos, state.edit],
      edit: null,
    };
    console.log("new State add-todo", newState);
    return newState;
  },
  "remove-todo": (state, payload) => {
    const todosCopy = [...state.todos];
    const idx = todosCopy.indexOf(payload);
    todosCopy.splice(idx, 1);
    return {
      ...state,
      todos: todosCopy,
    };
  },
  "set-editing": (state, payload) => {
    const newState = {
      ...state,
      editing: payload,
      oldEdit: payload,
      updatedEdit: payload,
    };
    console.log("newState - set-editing", newState);
    return newState;
  },
  "cancel-edit": (state) => {
    return {
      ...state,
      edit: null,
      editing: null,
    };
  },
  "update-todo": (state, payload) => {
    const newState = {
      ...state,
      updatedEdit: payload,
    };
    console.log("newState", newState);
    return newState;
  },
  "finish-editing": (state) => {
    const oldIdx = state.todos.indexOf(state.oldEdit);
    const todos = [...state.todos];
    todos.splice(oldIdx, 1, state.updatedEdit);

    const newState = {
      ...state,
      todos,
      editing: null,
      oldEdit: null,
      updatedEdit: null,
    };

    return newState;
  },
};

const TodoEditingItem = ({ state, emit, props }) => {
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

const TodoItem = ({ state, emit, props }) => {
  console.log("state", state);
  console.log("emit", emit);
  const handleClick = () => {
    emit("remove-todo", props.todo);
  };
  const handleEdit = () => {
    emit("set-editing", props.todo);
  };
  return (
    <div className="todo-container">
      <span className="todo">{props.todo}</span>
      <button className="btn third" onClick={handleEdit}>
        Edit
      </button>
      <button className="btn secondary" onClick={handleClick}>
        Done
      </button>
    </div>
  );
};

const TodoList = ({ state }) => {
  const editingItem = state.editing;
  return (
    <div style="width: 100%">
      {state.todos.map((todo, i) => {
        return editingItem == todo ? (
          <TodoEditingItem todo={todo} />
        ) : (
          <TodoItem todo={todo} />
        );
      })}
    </div>
  );
};

const App = (state, emit) => {
  const handleClick = () => {
    emit("add-todo");
  };
  const handleEdit = (e) => {
    emit("update-new-todo", e.target.value);
  };
  return (
    <div className="main">
      <h2 className="title">My Todo App</h2>
      <div style="display: flex">
        <input type="text" value={state.edit} onInput={(e) => handleEdit(e)} />
        <button className="btn primary" onClick={handleClick}>
          Add Todo
        </button>
      </div>

      <h3>Todo List</h3>
      <TodoList />
    </div>
  );
};

const Header = ({ props }) => {
  return (
    <div>
      <h3 style={props.state.style}>This is my h3</h3>
      <h4 style={props.style}> this should be orange</h4>
    </div>
  );
};

const BasicApp = (state, emit) => {
  const handleClick = () => {
    emit("update-title");
  };
  return (
    <div className="main">
      <h2 style={state.style}>{state.title}</h2>
      <button onClick={handleClick}>Click me</button>
      <Header state={state} emit={emit} style={{ color: "orange" }} />
    </div>
  );
};

const url = "https://www.thecocktaildb.com/api/json/v1/1/random.php";

async function fetchCocktailDrink() {
  const response = await fetch(url);
  const data = await response.json();

  return data.drinks[0];
}

const Info = defineComponent({
  state(cocktail) {
    cocktail;
  },
  render() {
    return (
      <div>
        <div>Glass: {this.state.cocktail.strGlass}</div>
        <div>Instructions: {this.state.cocktail.strInstructions}</div>
      </div>
    );
  },
});

const CockTail = defineComponent({
  state() {
    return {
      isLoading: false,
      cocktail: null,
    };
  },
  render() {
    const { isLoading, cocktail } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <h1>Random Cocktail</h1>
        <button onClick={this.fetchCocktail}>Get Random Cockatil</button>
        <p>Drink name: {this.state.cocktail && this.state.cocktail.strDrink}</p>
        {this.state.cocktail && this.state.cocktail.strDrink ? (
          <div>
            <div>Glass: {this.state.cocktail.strGlass}</div>
            <div>Instructions: {this.state.cocktail.strInstructions}</div>
            <img src={this.state.cocktail.strDrinkThumb} alt="drink" />
          </div>
        ) : null}
      </div>
    );
  },
  async fetchCocktail() {
    this.updateState({ isLoading: true, cocktail: null });
    const cocktail = await fetchCocktailDrink();

    setTimeout(() => {
      console.log(cocktail);
      this.updateState({ isLoading: false, cocktail });
    }, 1000);
  },
});

const cockTail = new CockTail();
cockTail.mount(root);

//encours.createApp({ state: initialState, reducers, view: App }).mount(root);
// encours
//   .createApp({ state: initialState, reducers, view: BasicApp })
//   .mount(root);
