import * as types from "../constants";

const initialState = {
  items: [],
  meta: {},
  item: {},
};

const tableReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_TABLE:
      return {
        ...state,
        items: action.data.items,
        meta: action.data.meta,
      };
    case types.CREATE_TABLE:
    case types.DELETE_TABLE:
    case types.UPDATE_TABLE:
      return state;
    case types.DETAIL_TABLE:
      return {
        ...state,
        item: action.data,
      };
    default:
      return state;
  }
};

export default tableReducer;
