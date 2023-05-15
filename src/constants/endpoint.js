export const Endpoint = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  FLOOR: "/floor",
  SETTING: "/setting",
  CATEGORY: "/category",
  TABLE: "/table",
  CUSTOMER: "/customer",
  STORAGE: "/storage",
  EMPLOYEE: "/employee",
  DISH: "/dish",
  USER: "/user",
  ORDER: "/order",
};

export const routers = [
  {
    endpoint: Endpoint.DASHBOARD,
    text: "Dashboard",
  },
  {
    endpoint: Endpoint.FLOOR,
    text: "Quản lý tầng",
  },
  {
    endpoint: Endpoint.TABLE,
    text: "Quản lý bàn",
  },
  {
    endpoint: Endpoint.CATEGORY,
    text: "Quản lý danh mục",
  },
  {
    endpoint: Endpoint.DISH,
    text: "Quản lý món ăn",
  },
  {
    endpoint: Endpoint.EMPLOYEE,
    text: "Quản lý nhân viên",
  },
  {
    endpoint: Endpoint.CUSTOMER,
    text: "Quản lý khách hàng",
  },
  {
    endpoint: Endpoint.ORDER,
    text: "Quản lý đơn hàng",
  },
];
