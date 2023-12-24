import { createElement } from "./h";
import { createApp } from "./app";
import { defineComponent } from "./component";
import { combineReducers, Etat } from "./etat";

import { getRouter } from "./hooks";

const encours = {
  createElement,
  createApp,
};

export default encours;
export { defineComponent, combineReducers, getRouter, Etat };
