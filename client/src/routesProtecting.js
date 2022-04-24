import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

function ProtectedRoutes({ isAuth: isAuth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component />;
        } else {
          return (
            <Navigate to={`/authentication/${rest.location.search}`} replace />
          );
        }
      }}
    />
  );
}
export default ProtectedRoutes;
