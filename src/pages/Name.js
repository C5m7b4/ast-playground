import encours from "../encours";
import Signals from "../Signals";

const configSignal = Signals.createSignal({
  firstName: "mike",
  lastName: "bedingfield",
});

const Name = () => {
  const handleNameClick = () => {};

  const handleInput = (e) => {
    console.log(e.target.value);
  };
  return (
    <div>
      <input
        type="text"
        value={configSignal.value.firstName}
        onInput={handleInput}
      />
      <button onClick={handleNameClick}>Update Name</button>
    </div>
  );
};

export default Name;
