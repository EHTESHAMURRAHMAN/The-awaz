
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
function AdminLayout() {
  return (
    <>
    
      <Navbar />
      {/* Render nested admin pages  (Dashboard, AddArticle, etc.) if i want  */}
      <Outlet />
      <Footer/>
    </>
  );
}

export default AdminLayout;
