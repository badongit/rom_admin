import { stringify } from "query-string";
import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";

export const summaryService = () => axios.get(`${APIEnum.DASHBOARD}/summary`);
export const orderStatistics = (params) =>
  axios.get(`${APIEnum.DASHBOARD}/order?${stringify(params)}`);
export const revenueStatistics = (params) =>
  axios.get(`${APIEnum.DASHBOARD}/revenue?${stringify(params)}`);
export const dishOrderStatistics = (params) =>
  axios.get(`${APIEnum.DASHBOARD}/dishes?${stringify(params)}`);
export const customerOrderStatistics = (params) =>
  axios.get(`${APIEnum.DASHBOARD}/customers?${stringify(params)}`);
export const orderStatusService = (params) =>
  axios.get(`${APIEnum.DASHBOARD}/order?${stringify(params)}`);
