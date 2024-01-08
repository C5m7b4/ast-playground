import encours from "../encours";
import Signals from "../Signals";

const name = Signals.createSignal("");

const About = () => {
  const state = encours.getState("appReducer");
  const dispatch = encours.getDispatch();

  const handleClick = () => {
    console.log("i have been clicked");
    dispatch("appReducer", {
      type: "UPDATE_URL",
      payload: name.value,
    });
  };
  const handleInput = (e) => {
    name.value = e.target.value;
    dispatch("appReducer", {
      type: "UPDATE_URL",
      payload: name.value,
    });
  };
  return (
    <div>
      <h2>About</h2>
      <input type="text" value={name.value} onInput={handleInput} />
      <button onClick={handleClick}>Update Name</button>
      <p>the current name is: {name.value}</p>
    </div>
  );
};

export default About;
