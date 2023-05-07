import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import floorReducer from "./floor.reducer";
import categoryReducer from "./category.reducer";
import tableReducer from "./table.reducer";
import customerReducer from "./customer.reducer";
import dashboardReducer from "./dashboard.reducer";
import orderReducer from "./order.reducer";
import dishReducer from "./dish.reducer";
import settingReducer from "./setting.reducer";
import employeeReducer from "./employee.reducer";
import storageReducer from "./storage.reducer";
import roleReducer from "./role.reducer";
import userReducer from "./user.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  floor: floorReducer,
  category: categoryReducer,
  table: tableReducer,
  customer: customerReducer,
  storage: storageReducer,
  employee: employeeReducer,
  role: roleReducer,
  setting: settingReducer,
  dish: dishReducer,
  user: userReducer,
  order: orderReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
