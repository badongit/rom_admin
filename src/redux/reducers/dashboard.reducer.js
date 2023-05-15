import * as types from "../constants";

const initialState = {
  summary: {},
  orders: [],
  customers: [],
  orderMoneys: [],
  orderStatistic: [],
  revenueStatistic: [],
};

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.DASHBOARD_SUMMARY:
      return {
        ...state,
        summary: action.data,
      };
    case types.DASHBOARD_ORDER:
      return {
        ...state,
        orders: action.data.items,
      };
    case types.DASHBOARD_CUSTOMER:
      return {
        ...state,
        customers: action.data.users,
      };

    case types.DASHBOARD_ORDER_MONEY:
      return {
        ...state,
        orderMoneys: action.data.items,
      };
    case types.DASHBOARD_REVENUE:
      return {
        ...state,
        revenueStatistic: action.data,
      };
    default:
      return state;
  }
};

export default dashboardReducer;
