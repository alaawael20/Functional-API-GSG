import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { PATHS } from './../../router/paths';

const AdminGuard = ({ role }) => {
  if (role === 'admin') return <Outlet />;
  return <Navigate to={PATHS.HOME} replace={true} />;
};

export default AdminGuard;