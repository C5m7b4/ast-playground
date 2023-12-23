import { clone } from "../utils/objects";

export const Router = (function (emit) {
  let instance;
  const routes = [];
  let broadcast = null;
  let state = null;
  let vdom = null;
  let config = null;

  function navigate(e) {
    e.preventDefault();
    const path = e.target.attributes[0].value;
    //let routeInfo = routes.filter((r) => r.path === path);
    window.history.pushState({}, "", path);
    urlLocationHandler();
  }
  async function urlLocationHandler() {
    let location = window.location.pathname;
    if (location.length === 0) {
      location = "/";
    }
    const route = routes.filter((route) => route.path === location)[0];

    // Todo: figure out how to make ths configurable
    const routeFolder = config.routesFolder;
    const routeToLoad = `../../${routeFolder}/${route.component}`;
    //const Component = require(routeToLoad);
    const Component = require("../../pages/" + route.component);
    //const Component = require("../../" + routeFolder + "/" + route.component);
    const newComponentVdom = Component.default(state, broadcast);

    const content = replaceContent(newComponentVdom);
    broadcast("load-router-page", content);
  }
  function createInstance() {
    const routerConfig = require("../../../router.config.json");
    config = routerConfig;
    let definedRoutes = Array.from(document.querySelectorAll("[router-link]"));
    definedRoutes.forEach((route) => {
      const newRoute = {
        name: route.textContent,
        component: route.getAttribute("router-link"),
        path: route.getAttribute("href"),
      };
      routes.push(newRoute);
      route.addEventListener("click", navigate, false);
    });

    window.onpopstate = urlLocationHandler();
    urlLocationHandler();
  }
  function replaceContent(newVdomComponent) {
    let newVdom = clone(vdom);
    for (const el of newVdom.children) {
      if (el.el.id === config.routeOutputDiv) {
        el.children = newVdomComponent.children;
      }
    }
    return newVdom;
  }
  return {
    getInstance: function (_state, _emit, _vdom) {
      broadcast = _emit;
      state = _state;
      vdom = _vdom;
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();
