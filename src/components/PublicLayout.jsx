// src/components/PublicLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Crousel from './Crousel';
import Footer from './Footer';

function PublicLayout() {
  return (
    <div className="app-container">
      <Navbar />
      <Crousel />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default PublicLayout;
