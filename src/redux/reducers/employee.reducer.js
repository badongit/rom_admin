import * as types from "../constants";

const initialState = {
  items: [],
  meta: {},
  item: {},
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_EMPLOYEE:
      return {
        ...state,
        items: action.data.items,
        meta: action.data.meta,
      };
    case types.CREATE_EMPLOYEE:
    case types.DELETE_EMPLOYEE:
    case types.UPDATE_EMPLOYEE:
      return state;
    case types.DETAIL_EMPLOYEE:
      return {
        ...state,
        item: action.data,
      };
    default:
      return state;
  }
};

export default employeeReducer;
