import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";
import { stringify } from "query-string";

export const list = (query) =>
  axios.get(`${APIEnum.TABLE}?${stringify(query)}`);
export const create = (data) => axios.post(APIEnum.TABLE, data);
export const update = (id, data) => axios.patch(`${APIEnum.TABLE}/${id}`, data);
export const remove = (id) => axios.delete(`${APIEnum.TABLE}/${id}`);
export const detail = (id) => axios.get(`${APIEnum.TABLE}/${id}`);
