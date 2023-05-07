import { notification } from "antd";
import { list } from "../../service/role.service";
import * as types from "../constants";

export const listRole = () => {
  return async (dispatch) => {
    try {
      const response = await list();
      dispatch({
        type: types.LIST_ROLE,
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
