import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import floorReducer from "./floor.reducer";
import categoryReducer from "./category.reducer";
import tableReducer from "./table.reducer";
import couponReducer from "./coupon.reducer";
import dashboardReducer from "./dashboard.reducer";
import orderReducer from "./order.reducer";
import productReducer from "./product.reducer";
import settingReducer from "./setting.reducer";
import specificationReducer from "./specification.reducer";
import storageReducer from "./storage.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  floor: floorReducer,
  category: categoryReducer,
  table: tableReducer,
  coupon: couponReducer,
  storage: storageReducer,
  specification: specificationReducer,
  setting: settingReducer,
  product: productReducer,
  user: userReducer,
  order: orderReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
