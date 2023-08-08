import React, { useEffect } from 'react';
import { Route, Navigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { loadUser } from '../../actions/user';

function ProtectedRoute({
  element,
  user,
  isAuthenticated,
  isAdmin,
  loading,
  ...rest
}) {
  // const { isAuthenticated, user, loading } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(loadUser());
  // }, [dispatch]);
  console.log('isAuthenticated', isAuthenticated);

  if (loading) {
    // render a loading spinner or component
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (isAdmin && user.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return <Route {...rest} element={element} />;
}

export default ProtectedRoute;
