const express = require('express');
const router = express.Router();

const ootdController = require('../controllers/ootdController.js');

router.post(
  '/add',
  ootdController.addOOTD,
  ootdController.getAiImage,
  ootdController.saveAiImage,
  ootdController.updateNewOutfitWithImageUrl,
  (req, res) => {
    console.log('POST /ootd/add/ route hit');
    res.status(200).json({ newOutfit: res.locals.newOutfit });
  }
);

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
