import { destroyDom, mountDom, patchDom } from "./dom";
import { Dispatcher } from "./dispatcher";
import { Router } from "./router/Router";
import { Etat } from "./etat/Etat";
import { clone } from "./utils/objects";

export function createApp({ view, reducers = {} }) {
  let parentEl = null;
  let vdom = null;
  let state = {};
  let router = null;

  const dispatcher = new Dispatcher();
  const subscriptions = [dispatcher.afterEveryCommand(renderApp)];

  function emit(eventName, payload) {
    dispatcher.dispatch(eventName, payload);
  }

  const etat = Etat.getInstance(reducers, emit);
  function getState(reducer) {
    return etat.getState(reducer);
    //return etat;
  }
  this.getState = getState;
  function getDispatch() {
    return etat.getDispatch();
  }
  this.getDispatch = getDispatch;

  function getRouter() {
    return router;
  }

  window.onload = () => {
    router = Router.getInstance(emit, vdom);
  };

  this.getRouter = getRouter;

  const internalReducers = {
    "load-router-page": (state, payload) => {
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
      view = generatedVdom;
      const newVdom = patchDom(vdom, generatedVdom, parentEl, null);
      vdom = newVdom;
    } else {
      //const newVdom = view(state, emit);
      debugger;
      const Component = require("../pages/Home");
      const newComponentVdom = Component.default();
      const newContent = replaceContent(newComponentVdom);
      vdom = patchDom(vdom, newContent, parentEl, null, state, emit);
    }
  }

  function replaceContent(newVdomComponent) {
    let newVdom = clone(vdom);
    for (const el of newVdom.children) {
      if (el.el.id === "content") {
        el.children = newVdomComponent.children;
      }
    }
    return newVdom;
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
