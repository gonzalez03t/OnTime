import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import useStore from '../store/store';

// this is essentially just the reverse of the ProtectedRoute.js
// redirectedTo defaults to /dashboard
function UnAuthenticatedRoute({
  component: Component,
  redirectTo = '/dashboard',
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
          <Redirect to={redirectTo} />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
}

export default UnAuthenticatedRoute;
