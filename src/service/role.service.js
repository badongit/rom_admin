import axios from "../common/axios";
import { APIEnum } from "../constants/api.endpoint";

export const list = () => axios.get(`${APIEnum.ROLE}`);
