import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Login";
import Users from "./pages/Users";
import UserEdit, { userLoader } from "./pages/UserEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Users />,
  },
  {
    path: "/login",
    element: <Home />,
  },
  {
    path: "/users/:userId",
    element: <UserEdit />,
  },
]);

export default router;
