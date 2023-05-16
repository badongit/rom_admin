import * as types from "../constants";

const initialState = {
  summary: {},
  orderStatistic: [],
  revenueStatistic: [],
  dishes: [],
  customers: [],
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
        orderStatistic: action.data,
      };
    case types.DASHBOARD_CUSTOMER:
      return {
        ...state,
        customers: action.data,
      };
    case types.DASHBOARD_DISH:
      return {
        ...state,
        dishes: action.data,
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
