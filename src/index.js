import React from "react";

console.log("ready");
import encours from "./encours";

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
  todos: ["take out the trash", "cook some wings"],
};

const reducers = {
  "update-new-todo": (state, payload) => {
    const newState = {
      ...state,
      edit: payload,
    };
    console.log("new State", newState);
    return newState;
  },
};

const App = (state, emit) => {
  const app = " my sweet app";
  const n1 = 1;
  const n2 = 2;
  const handleClick = () => {
    alert("i have been clicked");
  };
  const handleEdit = (e) => {
    emit("update-new-todo", e.target.value);
  };
  return (
    <div className="main">
      <h2 style="color: red">This is our {app}</h2>
      <input type="text" value={state.edit} onInput={(e) => handleEdit(e)} />
      <button onClick={handleClick}>Click me</button>
      {n1 === n2 && <div>I should be here</div>}
      {1 === 1 ? <div>this is true</div> : <div>this is false</div>}
    </div>
  );
};

encours.createApp({ state: initialState, reducers, view: App }).mount(root);
