import * as types from "../constants";

const initialState = {
  items: [],
  meta: {},
  item: {},
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_CUSTOMER:
      return {
        ...state,
        items: action.data.items,
        meta: action.data.meta,
      };
    case types.CREATE_CUSTOMER:
    case types.DELETE_CUSTOMER:
    case types.UPDATE_CUSTOMER:
      return state;
    case types.DETAIL_CUSTOMER:
      return {
        ...state,
        item: action.data,
      };
    default:
      return state;
  }
};

export default customerReducer;
