import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Login from "./authentication";

function ProtectedRoutes({ isAuth: isAuth, component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuth) {
          return <Component />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/authentication",
                state: { from: props.location },
              }}
            />
          );
        }
      }}
    />
  );
}
export default ProtectedRoutes;
