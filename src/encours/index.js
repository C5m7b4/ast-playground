import { createElement } from "./h";
import { createApp } from "./app";
import { defineComponent } from "./component";
import { combineReducers, Etat } from "./etat";

const encours = {
  createElement,
  createApp,
};

export default encours;
export { defineComponent, combineReducers, Etat };
