import { createElement } from "./h";
import { createApp } from "./app";
import { defineComponent } from "./component";
import { combineReducers, Etat } from "./etat";

import { getRouter, getState, getDispatch } from "./hooks";

const encours = {
  createElement,
  createApp,
  getRouter,
  getState,
  getDispatch,
};

export default encours;
export { defineComponent, combineReducers, Etat };
