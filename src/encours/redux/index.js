const validateAction = (action) => {
  if (!action || typeof action !== "object" || Array.isArray(action))
    throw new Error("Action must be an object");

  if (typeof action.type === "undefined")
    throw new Error("action must be defined");
};

const createStore = (reducer, initialState) => {
  const store = {};

  store.state = initialState;
  store.listeners = [];
  store.subscribe = (listener) => store.listeners.push(listener);
  store.dispatch = (action) => {
    validateAction(action);

    store.state - reducer(store.state, action);
    store.listeners.forEach((listener) => listener(action));
  };
  store.getState = () => store.state;
  store.dispatch({ type: "@@redux/INIT" });

  return store;
};

export { createStore };
