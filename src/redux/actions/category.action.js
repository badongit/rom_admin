import { notification } from "antd";
import {
  create,
  detail,
  list,
  remove,
  update,
} from "../../service/category.service";
import * as types from "../constants";

export const listCategory = (query) => {
  return async (dispatch) => {
    try {
      const response = await list(query);
      dispatch({
        type: types.LIST_CATEGORY,
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

export const createCategory = (data, cb) => {
  return async (dispatch) => {
    try {
      const form = new FormData();
      form.append("name", data.name);
      form.append("image", data.images.file.originFileObj);
      const response = await create(form);

      if (response.statusCode !== 201) {
        notification.open({
          message: "Thất bại",
          description: response.message,
        });
      } else {
        notification.open({
          message: "Thành công",
          description: response.message,
        });
        cb();
      }
    } catch (error) {
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const updateCategory = (id, data, cb) => {
  console.log(
    "🚀 ~ file: category.action.js:60 ~ updateCategory ~ data:",
    data
  );
  return async (dispatch) => {
    try {
      const form = new FormData();
      form.append("name", data.name);
      if (data.images?.file) {
        form.append("image", data.images.file.originFileObj);
      }

      const response = await update(id, form);

      if (response.statusCode !== 200) {
        notification.open({
          message: "Thất bại",
          description: response.message,
        });
      } else {
        notification.open({
          message: "Thành công",
          description: response.message,
        });
        cb();
      }
    } catch (error) {
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const deleteCategory = (id, cb) => {
  return async (dispatch) => {
    try {
      const response = await remove(id);

      if (response.statusCode !== 200) {
        notification.open({
          message: "Thất bại",
          description: response.message,
        });
      } else {
        notification.open({
          message: "Thành công",
          description: response.message,
        });
        cb();
      }
    } catch (error) {
      console.log(error?.message || error);
      notification.open({
        message: "Thất bại",
        description: error?.message || error,
      });
    }
  };
};

export const detailCategory = (id) => {
  return async (dispatch) => {
    try {
      const response = await detail(id);
      dispatch({
        type: types.DETAIL_CATEGORY,
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
