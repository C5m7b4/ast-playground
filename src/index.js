console.log("ready");
import encours from "./encours";

const step1 = (
  <div className="main">
    <h1 style="color:red">Hello</h1>
    <button>Click me</button>
  </div>
);

console.log(step1);
const root = document.getElementById("app");

const initialState = {};
const reducers = {};

const App = (state, emit) => {
  const handleClick = () => {
    alert("i have been clicked");
  };
  return (
    <div className="main">
      <h2 style="color: red">This is our app</h2>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

encours.createApp({ state: initialState, reducers, view: App }).mount(root);
