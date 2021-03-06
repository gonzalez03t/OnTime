import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useStore from '../store/store';

// redirectTo is optional, defaulting to /login
function ProtectedRoute({
  component: Component,
  redirectTo = '/login',
  ...restOfProps
}) {
  const { isAuthenticated } = useStore((state) => ({
    isAuthenticated: state.isAuthenticated,
  }));

  return (
    <Route
      {...restOfProps}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect to={redirectTo} />
        )
      }
    />
  );
}

export default ProtectedRoute;
