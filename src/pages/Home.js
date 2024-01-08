import encours from "../encours";
import * as actions from "../actions/appActions";
import Signals from "../Signals";
import Name from "./Name";

// put our signals here
const url = Signals.createSignal("http://myUrl.com");
const myArtifact = encours.createArtifact("here is an artifact");

const Home = () => {
  const router = encours.getRouter();

  const state = encours.getState("appReducer");
  const dispatch = encours.getDispatch();

  myArtifact.subscribe((value) => {
    console.log("artifact has changed", value);
  });

  Signals.createEffect(() => {
    console.log("createEffect for url has changed", url.value);
  }, [url]);

  const handleClick = () => {
    url.value = "https://thisshouldwork.com";
    dispatch("appReducer", {
      type: actions.UPDATE_URL,
      payload: "https://thisisfunny.com",
    });
  };

  const handleArtifact = () => {
    myArtifact.value = "here I'm updated";
    dispatch("appReducer", {
      type: actions.UPDATE_URL,
      payload: "https://thisisfunny.com",
    });
  };

  return (
    <div>
      <h1>Home</h1>
      <p>
        This page is our landing page. We are going to try to use some basic
        comonents in this file
      </p>
      <h2>State test</h2>
      <p> the url for this state is {state.url}</p>
      <p> This is my signal: {url.value}</p>
      <div>
        <button onClick={handleClick}>Update URL</button>
      </div>
      <Name />
      <div>my artifact: {myArtifact.value}</div>
      <button onClick={handleArtifact}>Update Artifact</button>
    </div>
  );
};

export default Home;
