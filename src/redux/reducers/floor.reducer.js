import * as types from "../constants";

const initialState = {
  items: [],
  meta: {},
  item: {},
};

const branchReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_FLOOR:
      return {
        ...state,
        items: action.branch.items,
        meta: action.branch.meta,
      };
    case types.CREATE_FLOOR:
    case types.DELETE_FLOOR:
    case types.UPDATE_FLOOR:
      return state;
    case types.DETAIL_FLOOR:
      return {
        ...state,
        item: action.branch,
      };
    default:
      return state;
  }
};

export default branchReducer;
