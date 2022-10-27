import { Navigate, Outlet, useLocation } from "react-router-dom";
import {getCookie} from "../utils/cookie";

function PublicRoute() {
  const location = useLocation();
  const fromPage = location.state?.from?.pathname || "/";
  const isAuth = !!getCookie("token");

  if (isAuth) {
    return <Navigate to={fromPage} replace />;
  }

  return <Outlet />;
}

export default PublicRoute;
