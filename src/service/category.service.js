import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";
import { stringify } from "query-string";

export const list = (query) =>
  axios.get(`${APIEnum.CATEGORY}?${stringify(query)}`);
export const create = (data) =>
  axios.post(APIEnum.CATEGORY, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const update = (id, data) =>
  axios.put(`${APIEnum.CATEGORY}/${id}`, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
export const remove = (id) => axios.delete(`${APIEnum.CATEGORY}/${id}`);
export const detail = (id) => axios.get(`${APIEnum.CATEGORY}/${id}`);
