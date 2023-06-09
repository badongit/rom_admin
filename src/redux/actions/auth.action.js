import { notification } from "antd";
import { getProfileService, loginService } from "../../service/auth.service";
import * as types from "../constants";

export const login = (user) => {
  return async (dispatch) => {
    try {
      const response = await loginService(user);

      if (
        response.statusCode !== 200 ||
        response.data?.user?.role?.code !== "ADMIN"
      ) {
        notification.open({
          message: "Đăng nhập thất bại.",
          description: response.message,
        });
      } else {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        dispatch({
          type: types.LOGIN,
          token: response.data.accessToken,
          refreshToken: response.data.refreshToken,
        });
      }
    } catch (error) {
      console.log(error?.message || error);
      notification.open({
        message: "Đăng nhập thất bại.",
        description: error?.message || error,
      });
    }
  };
};

export const getProfile = (cb) => {
  return async (dispatch) => {
    try {
      const response = await getProfileService();

      dispatch({
        type: types.GET_PROFILE,
        user: response.data,
      });
      cb();
    } catch (error) {
      dispatch({
        type: types.LOGOUT,
      });
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    dispatch({
      type: types.LOGOUT,
    });
    window.location.reload();
  };
};
