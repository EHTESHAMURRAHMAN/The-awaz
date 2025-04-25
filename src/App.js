// src/App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import PublicLayout from './components/PublicLayout';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

import AdminLogin from './components/AdminLogin';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './components/AdminDashboard';
import AddArticle from './components/AddArticle';

import Auth from './components/Auth';
import AllArticles from './components/AllArticles';
import AdminCarousel from './components/AdminCarousel';
import AddCarousel from './components/AddCarousel';
import CompleteArticle from './components/CompleteArticle';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (wrapped by PublicLayout) */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/complete/article" element={<CompleteArticle/>}/>
          <Route path="/article/:id" element={<CompleteArticle />} />
        </Route>

        {/* Admin Login (public route) */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route element={<Auth />}>
          {/* Wrap all admin pages with AdminLayout (includes Navbar) */}
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/dashboard/add-article" element={<AddArticle />} />
            <Route path="/admin/dashboard/all-articles" element={<AllArticles />} />         
            <Route path="/admin/dashboard/carousel" element={<AdminCarousel />} />
            <Route path="/admin/dashboard/carousel/add" element={<AddCarousel />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
