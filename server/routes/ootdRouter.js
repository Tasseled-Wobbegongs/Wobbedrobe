const express = require('express');
const router = express.Router();

const ootdController = require('../controllers/ootdController.js');

router.post('/add', ootdController.addOOTD, (req, res) => {
  console.log('POST /ootd/add/ route hit');
  console.log(req.body);
  console.log(res.locals.outfit);
  res.status(200).json({ newOutfit: res.locals.outfit });
});

router.get('/get/:id', (req, res) => {
  console.log('GET /ootd/get/:id route hit');
  console.log(req.body);
  res.status(200).json({});
});

router.delete('/delete/:id', (req, res) => {
  console.log('DELETE /ootd/delete/:category/:id route hit');
  console.log(req.body);
  res.status(200).json({});
});

router.post('/update/:id', (req, res) => {
  console.log('POST /ootd/update/:id route hit');
  console.log(req.body);
  res.status(200).json({});
});

module.exports = router;
