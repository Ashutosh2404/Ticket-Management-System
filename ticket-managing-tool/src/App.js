import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

import { Navbar } from './components/Navbar';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import Dashboard from './components/Dashboard';
import TicketPage from './components/TicketPage';
import EmployeePage from './components/EmployeePage';
import EstimationPage from './components/EstimationPage';
import ProtectedRoute from './components/ProtectedRoute';

function AppWrapper() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const location = useLocation();


  // Always set axios Authorization header when token changes
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);


  const handleLogin = (newToken) => {
  localStorage.setItem('token', newToken);
  axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
  setToken(newToken);
  };


  const handleLogout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setToken(null);
  };

  const hideNavbar = ['/login', '/register'].includes(location.pathname);

  return (
    <>
      {!hideNavbar && token && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Redirect root to login if not authenticated, else to dashboard */}
        <Route
          path="/"
          element={
            token ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute token={token}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/tickets"
          element={
            <ProtectedRoute token={token}>
              <TicketPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute token={token}>
              <EmployeePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/estimation"
          element={
            <ProtectedRoute token={token}>
              <EstimationPage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router basename="/management-tool">
      <AppWrapper />
    </Router>
  );
}

export default App;
