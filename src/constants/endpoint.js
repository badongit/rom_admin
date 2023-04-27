export const Endpoint = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  FLOOR: "/floor",
  SETTING: "/setting",
  CATEGORY: "/category",
  TABLE: "/table",
  CUSTOMER: "/customer",
  STORAGE: "/storage",
  SPECIFICATION: "/specification",
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
    endpoint: Endpoint.STORAGE,
    text: "Quản lý bộ nhớ",
  },
  {
    endpoint: Endpoint.SPECIFICATION,
    text: "Quản lý thông số",
  },
  {
    endpoint: Endpoint.CUSTOMER,
    text: "Quản lý khách hàng",
  },
  {
    endpoint: Endpoint.USER,
    text: "Quản lý người dùng",
  },
  {
    endpoint: Endpoint.ORDER,
    text: "Quản lý đơn hàng",
  },
  {
    endpoint: Endpoint.SETTING,
    text: "Cài đặt website",
  },
];
