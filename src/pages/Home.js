import encours from "../encours";

const Home = () => {
  const router = encours.getRouter();
  const state = encours.getState("appReducer");
  console.log("home router", router);
  console.log("home state", state);
  return (
    <div>
      <h1>Home</h1>
      <p>
        This page is our landing page. We are going to try to use some basic
        comonents in this file
      </p>
      <h2>State test</h2>
      <p> the url for this state is {state.url}</p>
    </div>
  );
};

export default Home;
