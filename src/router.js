import NotFound from "./components/NotFound";
import { Endpoint } from "./constants/endpoint";
import PrivateRouter from "./containers/PrivateRouter";
import Category from "./pages/Category";
import Customer from "./pages/Customer";
import Dashboard from "./pages/Dashboard";
import Dish from "./pages/Dish";
import Employee from "./pages/Employee";
import Floor from "./pages/Floor";
import Login from "./pages/Login";
import Order from "./pages/Order";
import Table from "./pages/Table";

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
    path: Endpoint.CATEGORY,
    element: <PrivateRouter component={Category} />,
  },
  {
    path: Endpoint.TABLE,
    element: <PrivateRouter component={Table} />,
  },
  {
    path: Endpoint.CUSTOMER,
    element: <PrivateRouter component={Customer} />,
  },
  {
    path: Endpoint.EMPLOYEE,
    element: <PrivateRouter component={Employee} />,
  },
  {
    path: Endpoint.DISH,
    element: <PrivateRouter component={Dish} />,
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
