import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";
import { stringify } from "query-string";

export const list = (query) => axios.get(`${APIEnum.DISH}?${stringify(query)}`);
export const create = (data) =>
  axios.post(APIEnum.DISH, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const update = (id, data) =>
  axios.patch(`${APIEnum.DISH}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const remove = (id) => axios.delete(`${APIEnum.DISH}/${id}`);
export const detail = (id) => axios.get(`${APIEnum.DISH}/${id}`);
