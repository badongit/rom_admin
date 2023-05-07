import * as types from "../constants";

const initialState = {
  items: [],
  meta: {},
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_ROLE:
      return {
        ...state,
        items: action.data.items,
        meta: action.data.meta,
      };
    default:
      return state;
  }
};

export default employeeReducer;
