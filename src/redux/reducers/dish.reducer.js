import * as types from "../constants";

const initialState = {
  items: [],
  meta: {},
  item: {},
  productSells: [],
};

const dishReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_DISH:
      return {
        ...state,
        items: action.data.items,
        meta: action.data.meta,
      };
    case types.CREATE_DISH:
    case types.DELETE_DISH:
    case types.UPDATE_DISH:
      return state;
    case types.DETAIL_DISH:
      return {
        ...state,
        item: action.data,
      };
    case types.LIST_DISH_SELL:
      return {
        ...state,
        productSells: action.data.items,
        meta: action.data.meta,
      };
    default:
      return state;
  }
};

export default dishReducer;
