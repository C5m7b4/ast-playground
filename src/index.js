console.log("ready to start coding");
import encours from "./encours";
import { rootReducer } from "./reducers";
import Header from "./components/Header";

let currentAccessed = null;
const effectQueue = [];

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

encours.createApp({ reducers: rootReducer, view: App }).mount(root);
