import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Newscan from './pages/Newscan';
import Products from './pages/Products';


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/newscan" element={<Newscan />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
