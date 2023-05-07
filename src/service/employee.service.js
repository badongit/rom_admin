import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";
import { stringify } from "query-string";

export const list = (query) =>
  axios.get(`${APIEnum.EMPLOYEE}?${stringify(query)}`);
export const create = (data) => axios.post(APIEnum.EMPLOYEE, data);
export const update = (id, data) =>
  axios.patch(`${APIEnum.EMPLOYEE}/${id}/admin`, data);
export const remove = (id) => axios.delete(`${APIEnum.EMPLOYEE}/${id}`);
export const detail = (id) => axios.get(`${APIEnum.EMPLOYEE}/${id}`);
