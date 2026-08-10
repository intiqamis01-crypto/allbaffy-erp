import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#FAF7F2' }}>
      {/* Sol menyu */}
      <Sidebar />

      {/* Seçilən səhifənin məzmunu burada görünəcək */}
      <main style={{ flex: 1, padding: '24px', overflowY: 'auto' }}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;