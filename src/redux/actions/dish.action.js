import { notification } from "antd";
import {
  create,
  detail,
  list,
  remove,
  update,
} from "../../service/dish.service";
import * as types from "../constants";

export const listDish = (query) => {
  return async (dispatch) => {
    try {
      const response = await list(query);
      dispatch({
        type: types.LIST_DISH,
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

export const createDish = (data, cb) => {
  return async (dispatch) => {
    try {
      const form = new FormData();
      form.append("name", data.name);
      form.append("description", data.description);
      form.append("shortDescription", data.shortDescription);
      form.append("branchId", data.branchId);
      form.append("categoryId", data.categoryId);
      form.append("productVersions", JSON.stringify(data.productVersions));
      form.append(
        "specificationDetails",
        JSON.stringify(data.specificationDetails)
      );
      const keepImages = [];
      data.images.fileList.forEach((e) => {
        if (e.originFileObj) form.append("images", e.originFileObj);
        else keepImages.push(e.name);
      });
      form.append("keepImages", keepImages);

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

export const updateDish = (id, data, cb) => {
  return async (dispatch) => {
    try {
      const form = new FormData();
      form.append("name", data.name);
      form.append("description", data.description);
      form.append("shortDescription", data.shortDescription);
      form.append("branchId", data.branchId);
      form.append("categoryId", data.categoryId);
      form.append("productVersions", JSON.stringify(data.productVersions));
      form.append(
        "specificationDetails",
        JSON.stringify(data.specificationDetails)
      );
      const keepImages = [];
      data.images?.fileList?.forEach((e) => {
        if (e.originFileObj) form.append("images", e.originFileObj);
        else keepImages.push(e.name);
      });
      form.append("keepImages", keepImages);

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

export const deleteDish = (id, cb) => {
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

export const detailDish = (id) => {
  return async (dispatch) => {
    try {
      const response = await detail(id);
      dispatch({
        type: types.DETAIL_DISH,
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

export const listDishSell = (query) => {
  return async (dispatch) => {
    try {
      const response = await list(query);
      dispatch({
        type: types.LIST_DISH_SELL,
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
