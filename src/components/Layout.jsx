import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'sans-serif', backgroundColor: '#f8fafc' }}>
      <Sidebar />
      <main style={{ flex: 1, padding: '30px' }}>
        {children}
      </main>
    </div>
  );
}