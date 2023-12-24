const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
  console.log('POST /user/login route hit');
  res.status(200).json({});
});

router.post('/signup', (req, res) => {
  console.log('POST /user/signup route hit');
  res.status(200).json({});
});

router.delete('/delete', (req, res) => {
  console.log('DELETE /user/delete route hit');
  res.status(200).json({});
});

module.exports = router;
