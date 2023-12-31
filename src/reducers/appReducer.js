import * as actions from "../actions/appActions";

const initialState = {
  url: "https://gooogle.com",
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.INIT:
      return {
        ...state,
      };
    case actions.UPDATE_URL:
      return {
        ...state,
        url: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
