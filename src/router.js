import NotFound from "./components/NotFound";
import { Endpoint } from "./constants/endpoint";
import PrivateRouter from "./containers/PrivateRouter";
import Floor from "./pages/Floor";
import Category from "./pages/Category";
import Table from "./pages/Table";
import Customer from "./pages/Customer";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Dish from "./pages/Dish";
import Setting from "./pages/Setting";
import Specification from "./pages/Specification";
import Storage from "./pages/Storage";
import User from "./pages/User";

const routes = [
  {
    path: Endpoint.HOME,
    element: <Login />,
  },
  {
    path: Endpoint.DASHBOARD,
    element: <PrivateRouter component={Dashboard} />,
  },
  {
    path: Endpoint.FLOOR,
    element: <PrivateRouter component={Floor} />,
  },
  {
    path: Endpoint.SETTING,
    element: <PrivateRouter component={Setting} />,
  },
  {
    path: Endpoint.CATEGORY,
    element: <PrivateRouter component={Category} />,
  },
  {
    path: Endpoint.TABLE,
    element: <PrivateRouter component={Table} />,
  },
  {
    path: Endpoint.COUPON,
    element: <PrivateRouter component={Customer} />,
  },
  {
    path: Endpoint.STORAGE,
    element: <PrivateRouter component={Storage} />,
  },
  {
    path: Endpoint.SPECIFICATION,
    element: <PrivateRouter component={Specification} />,
  },
  {
    path: Endpoint.DISH,
    element: <PrivateRouter component={Dish} />,
  },
  {
    path: Endpoint.USER,
    element: <PrivateRouter component={User} />,
  },
  {
    path: Endpoint.ORDER,
    element: <PrivateRouter component={Order} />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
