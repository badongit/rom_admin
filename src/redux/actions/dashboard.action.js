import { notification } from "antd";
import {
  customerOrderStatistics,
  dishOrderStatistics,
  orderStatistics,
  revenueStatistics,
  summaryService,
} from "../../service/dashboard.service";
import * as types from "../constants";

export const dashboardSummary = () => {
  return async (dispatch) => {
    try {
      const response = await summaryService();
      dispatch({
        type: types.DASHBOARD_SUMMARY,
        data: response.data,
      });
    } catch (error) {
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const dashboardCustomer = (params) => {
  return async (dispatch) => {
    try {
      const response = await customerOrderStatistics(params);
      dispatch({
        type: types.DASHBOARD_CUSTOMER,
        data: response.data,
      });
    } catch (error) {
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const dashboardDish = (params) => {
  return async (dispatch) => {
    try {
      const response = await dishOrderStatistics(params);
      dispatch({
        type: types.DASHBOARD_DISH,
        data: response.data,
      });
    } catch (error) {
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const dashboardOrder = (params) => {
  return async (dispatch) => {
    try {
      const response = await orderStatistics(params);
      dispatch({
        type: types.DASHBOARD_ORDER,
        data: response.data,
      });
    } catch (error) {
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const dashboardRevenue = (params) => {
  return async (dispatch) => {
    try {
      const response = await revenueStatistics(params);
      dispatch({
        type: types.DASHBOARD_REVENUE,
        data: response.data,
      });
    } catch (error) {
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};
