import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";
import { stringify } from "query-string";

export const list = (query) =>
  axios.get(`${APIEnum.FLOOR}?${stringify(query)}`);
export const create = (data) => axios.post(APIEnum.FLOOR, data);
export const update = (id, data) => axios.patch(`${APIEnum.FLOOR}/${id}`, data);
export const remove = (id) => axios.delete(`${APIEnum.FLOOR}/${id}`);
export const detail = (id) => axios.get(`${APIEnum.FLOOR}/${id}`);
