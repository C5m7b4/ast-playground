import { createElement } from "./h";
import { createApp } from "./app";
import { defineComponent } from "./component";
import { combineReducers, Etat } from "./etat";

import { getRouter, getState, getDispatch } from "./hooks";
import { createArtifact } from "./artifact";

const encours = {
  createElement,
  createApp,
  getRouter,
  getState,
  getDispatch,
  createArtifact,
};

export default encours;
export { defineComponent, combineReducers, Etat };
