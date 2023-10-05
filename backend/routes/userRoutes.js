module.exports = function(app) {
const express = require('express');
const router = express.Router();
const pool = require('../db/db');
const { transport } = require('../utils/email');
const generateOTP = require('../utils/generateOTP')
// Create User Table if not exists

// User Registration
router.post('/register',app.auth,app.cors, (req, res) => {
  const { email, password } = req.body;
  // Check if email already exists
  pool.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email], (err, rows) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    if (rows.length > 0) {
      // User with this email already exists
      return res.status(200).json({ error: 'Email already exists' });
    } else {
      const otp = generateOTP();
      pool.query('INSERT INTO users (email, password, verified, otp) VALUES (?, ?, ?, ?)', [email, password, false, otp], (err) => {
        if (err) {
          consol1e.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        transport.sendMail(
          {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP is: ${otp}`,
          },
          (err, info) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ message: 'Server error' });
            }
          }
        );
        const sql=`INSERT into userlogin (email,password) VALUES (?,?)`
        pool.query(sql,[email, password],(err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        res.status(201).json({ message: 'User registered successfully' });
    })
        
        
      });
    }
  });
});
}