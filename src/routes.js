import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Login";
import Users from "./pages/Users";
import UserEdit, { userLoader } from "./pages/UserEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/users",
    element: <Users />,
  },
  {
    path: "/users/:userId",
    element: <UserEdit />,
  },
]);

export default router;
