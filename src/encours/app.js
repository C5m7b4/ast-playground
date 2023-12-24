import { destroyDom, mountDom, patchDom } from "./dom";
import { Dispatcher } from "./dispatcher";
import { Router } from "./router/Router";
import { Etat } from "./etat/Etat";

export function createApp({ view, reducers = {} }) {
  let parentEl = null;
  let vdom = null;
  let state = {};

  const etat = Etat.getInstance(reducers);

  const dispatcher = new Dispatcher();
  const subscriptions = [dispatcher.afterEveryCommand(renderApp)];

  function emit(eventName, payload) {
    dispatcher.dispatch(eventName, payload);
  }

  window.onload = () => {
    const router = Router.getInstance(emit, vdom);
  };

  const internalReducers = {
    "load-router-page": (staet, payload) => {
      return state;
    },
  };
  for (const actionName in internalReducers) {
    const reducer = internalReducers[actionName];

    const subs = dispatcher.subscribe(actionName, (payload) => {
      state = reducer(state, payload);
    });
    subscriptions.push(subs);
  }

  function renderApp(_, generatedVdom) {
    if (generatedVdom) {
      const newVdom = patchDom(vdom, generatedVdom, parentEl, null);
      vdom = newVdom;
    } else {
      const newVdom = view(state, emit);
      vdom = patchDom(vdom, newVdom, parentEl, null, state, emit);
    }
  }

  return {
    mount(_parentEl) {
      parentEl = _parentEl;
      vdom = view();
      mountDom(vdom, parentEl, null);
    },
    unmount() {
      destroyDom(vdom);
      vdom = null;
      subscriptions.forEach((unsubscribe) => unsubscribe());
    },
  };
}

// export function render(vdom, parentEl, state, emit) {
//   mountDom(vdom, parentEl, null, state, emit);
// }
