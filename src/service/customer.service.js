import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";
import { stringify } from "query-string";

export const list = (query) =>
  axios.get(`${APIEnum.CUSTOMER}?${stringify(query)}`);
export const create = (data) => axios.post(APIEnum.CUSTOMER, data);
export const update = (id, data) =>
  axios.patch(`${APIEnum.CUSTOMER}/${id}`, data);
export const confirm = (id) => axios.put(`${APIEnum.CUSTOMER}/${id}/confirm`);
export const remove = (id) => axios.delete(`${APIEnum.CUSTOMER}/${id}`);
export const detail = (id) => axios.get(`${APIEnum.CUSTOMER}/${id}`);
