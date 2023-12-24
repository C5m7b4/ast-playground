import appReducer from "./appReducer";
//import todosReducer from "./todosReducer";
import { combineReducers } from "../encours";

export const rootReducer = combineReducers({
  appReducer,
  //todosReducer,
});
