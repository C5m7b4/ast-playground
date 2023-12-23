import { destroyDom, mountDom, patchDom } from "./dom";
import { Dispatcher } from "./dispatcher";
import { Router } from "./router/Router";

export function createApp({ state, view, reducers = {} }) {
  let parentEl = null;
  let vdom = null;

  const dispatcher = new Dispatcher();
  const subscriptions = [dispatcher.afterEveryCommand(renderApp)];

  function emit(eventName, payload) {
    dispatcher.dispatch(eventName, payload);
  }

  window.onload = () => {
    const router = Router.getInstance(state, emit, vdom);
  };

  for (const actionName in reducers) {
    const reducer = reducers[actionName];

    const subs = dispatcher.subscribe(actionName, (payload) => {
      state = reducer(state, payload);
    });
    subscriptions.push(subs);
  }

  function renderApp(_, generatedVdom) {
    if (generatedVdom) {
      const newVdom = patchDom(
        vdom,
        generatedVdom,
        parentEl,
        null,
        state,
        emit
      );
      vdom = newVdom;
    } else {
      const newVdom = view(state, emit);
      vdom = patchDom(vdom, newVdom, parentEl, null, state, emit);
    }
  }

  return {
    mount(_parentEl) {
      parentEl = _parentEl;
      vdom = view(state, emit);
      console.log(vdom);
      mountDom(vdom, parentEl, null, state, emit);
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
