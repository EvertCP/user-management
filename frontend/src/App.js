import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Users from './pages/Users';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { getToken, getUser } from './services/authService';

function App() {
  const isAuthenticated = !!getToken();
  const user = getUser();

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={isAuthenticated ? <Navigate to="/profile" /> : <Login />} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
        <Route path="/" element={<Navigate to={isAuthenticated ? "/profile" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
