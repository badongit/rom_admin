export const Endpoint = {
  HOME: "/",
  DASHBOARD: "/dashboard",
  FLOOR: "/floor",
  SETTING: "/setting",
  CATEGORY: "/category",
  TABLE: "/table",
  COUPON: "/coupon",
  STORAGE: "/storage",
  SPECIFICATION: "/specification",
  PRODUCT: "/product",
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
    endpoint: Endpoint.PRODUCT,
    text: "Quản lý sản phẩm",
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
    endpoint: Endpoint.COUPON,
    text: "Quản lý mã giảm giá",
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
