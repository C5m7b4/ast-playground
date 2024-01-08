export const Etat = (function () {
  let instance;
  const subscribers = new Map();
  let rootReducer = null;
  let listeners = [];
  let emit = null;

  // function subscribe(commandName, handler) {
  //   if (!subscribers.has(commandName)) {
  //     subscribers.set(commandName, []);
  //   }

  //   const handlers = subscribers.get(commandName);
  //   if (handlers.includes(handler)) {
  //     return () => {};
  //   }

  //   handlers.push(handler);
  //   return () => {
  //     const idx = handlers.indexOf(handler);
  //     handlers.splice(idx, 1);
  //   };
  // }

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  // function dispatch({ type, payload }) {
  //   if (subscribers.has(type)) {
  //     subscribers.get(type).forEach((handler) => handler(payload));
  //   } else {
  //     console.warn(`no handler for the command ${type}`);
  //   }
  // }

  const dispatch = (moduleState, action) => {
    const { type, payload } = action;
    const state = rootReducer(moduleState, { type, payload });
    //listeners.forEach((listener) => listener(state));
    emit("load-router-page");
  };

  function getState(reducer) {
    const globalState = rootReducer(reducer, { type: null });
    // now we need to subscrbe to these events
    this.subscribe(reducer, (payload) => {
      const globalState = rootReducer(reducer, payload);
      listeners.forEach((listener) => listener(globalState));
    });
    return globalState[reducer];
  }

  function getDispatch() {
    return dispatch;
  }

  function createInstance(_rootReducer) {
    rootReducer = _rootReducer;
    return {
      subscribe,
      dispatch,
      getState,
      getDispatch,
    };
  }
  return {
    getInstance: function (rootReducer, _emit) {
      if (!instance) {
        instance = createInstance(rootReducer);
        emit = _emit;
      }
      return instance;
    },
  };
})();
