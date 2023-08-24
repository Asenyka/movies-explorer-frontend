import React from "react";
import RedirectComponent from "./RedirectComponent/RedirectComponent";

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  return props.loggedIn ? (
    <Component {...props} />
  ) : (
    <RedirectComponent />
  );
};

export default ProtectedRouteElement;
