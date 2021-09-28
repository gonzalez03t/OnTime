import React from "react";
import { Redirect, Route } from "react-router-dom";
import useStore from '../store/store';

function ProtectedRoute({ component: Component, ...restOfProps }) {
  const { isAuthenticated } = useStore((state) => ({
    isAuthenticated: state.isAuthenticated,
  }));

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;