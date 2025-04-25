// src/components/Auth.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function Auth() {
  const adminData = localStorage.getItem('admin');
  const admin = adminData ? JSON.parse(adminData) : null;

  
  if (!admin || admin.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default Auth;