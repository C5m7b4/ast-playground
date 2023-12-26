export const Etat = (function () {
  let instance;
  const subscribers = new Map();
  let rootReducer = null;

  function subscribe(commandName, handler) {
    if (!subscribers.has(commandName)) {
      subscribers.set(commandName, []);
    }

    const handlers = subscribers.get(commandName);
    if (handlers.includes(handler)) {
      return () => {};
    }

    handlers.push(handler);
    return () => {
      const idx = handlers.indexOf(handler);
      handlers.splice(idx, 1);
    };
  }

  function dispatch(commandName, payload) {
    if (subscribers.has(commandName)) {
      subscribers.get(commandName).forEach((handler) => handler(payload));
    } else {
      console.warn(`no handler for the command ${commandName}`);
    }
  }

  function getState(reducer) {
    const globalState = rootReducer(reducer, { type: null });
    return globalState[reducer];
  }

  function createInstance(_rootReducer) {
    rootReducer = _rootReducer;
    return {
      subscribe,
      dispatch,
      getState,
    };
  }
  return {
    getInstance: function (rootReducer) {
      if (!instance) {
        instance = createInstance(rootReducer);
      }
      return instance;
    },
  };
})();
