const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Middleware to authenticate users
const authenticateUser = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c');
    req.user = decoded.user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};

// Middleware to authorize admin
const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden - Not an admin' });
  }
  next();
};

// Middleware to authorize doctor
const authorizeDoctor = (req, res, next) => {
  if (req.user.role !== 'doctor') {
    return res.status(403).json({ message: 'Forbidden - Not a doctor' });
  }
  next();
};

// Example routes
router.get('/admin/dashboard', authenticateUser, authorizeAdmin, (req, res) => {
  // Only admin can access this route
  res.json({ message: 'Admin dashboard' });
});

router.get('/doctor/dashboard', authenticateUser, authorizeDoctor, (req, res) => {
  // Only doctor can access this route
  res.json({ message: 'Doctor dashboard' });
});

module.exports = router;
