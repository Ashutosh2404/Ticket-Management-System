
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ token, children }) => {
  const location = useLocation();
  if (!token) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <div style={{ background: 'white', padding: 24, borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
          <h2 style={{ color: '#ef4444', marginBottom: 16 }}>You must be logged in to access this page.</h2>
          <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />
        </div>
      </div>
    );
  }
  return children;
};

export default ProtectedRoute;
