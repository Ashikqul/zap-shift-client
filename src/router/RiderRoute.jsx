import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hook/useAuth';
import useUserRole from '../hook/UsersRole';

const RiderRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (role !== 'rider') {
    return <Navigate to="/forbidden" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default RiderRoute;
