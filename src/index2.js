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

const ListItem = defineComponent({
  render() {
    const { data } = this.props;
    return <div>{data}</div>;
  },
});

const CockTail = defineComponent({
  state() {
    return {
      isLoading: false,
      cocktail: null,
      listItems: ["one", "two", "three", "four"],
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
        <div>
          {this.state.listItems.map((item) => (
            <ListItem data={item} />
          ))}
        </div>
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

// const cockTail = new CockTail();
// cockTail.mount(root);

encours.createApp({ state: initialState, reducers, view: App }).mount(root);
// encours
//   .createApp({ state: initialState, reducers, view: BasicApp })
//   .mount(root);
