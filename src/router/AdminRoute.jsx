import React from 'react';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hook/useAuth';
import useUserRole from '../hook/UsersRole';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useUserRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  if (!user) {
    // ইউজার না থাকলে লগইন পেজে পাঠাও
    return <Navigate to="/forbidden" state={{ from: location.pathname }} replace />;
  }

  if (role !== 'admin') {
    // ইউজার অ্যাডমিন না হলে forbidden পেজে পাঠাও
    return <Navigate to="/forbidden" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default AdminRoute;
