const express = require('express');
const router = express.Router();

router.post('/add/:category', (req, res) => {
  console.log('POST /wobbedrobe/add/:category route hit');
  console.log(req.body);
  res.status(200).json({});
});

router.get('/get/:category', (req, res) => {
  console.log('GET /wobbedrobe/get/:category route hit');
  console.log(req.body);
  res.status(200).json({});
});

router.delete('/delete/:category/:id', (req, res) => {
  console.log('DELETE /wobbedrobe/delete/:category/:id route hit');
  console.log(req.body);
  res.status(200).json({});
});

router.post('/update/:category/:id', (req, res) => {
  console.log('POST /wobbedrobe/update/:category/:id route hit');
  console.log(req.body);
  res.status(200).json({});
});

module.exports = router;
