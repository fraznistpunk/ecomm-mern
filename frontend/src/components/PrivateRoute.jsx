import React from 'react';
import { useSelector } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';

// if user is logged in we return Outlet else Navigate to redirect user to login/register.
const PrivateRoute = () => {
  const userInfo = useSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />
}

export default PrivateRoute;
