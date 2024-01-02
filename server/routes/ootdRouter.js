const express = require('express');
const router = express.Router();

const ootdController = require('../controllers/ootdController.js');

router.post(
  '/add',
  ootdController.addOOTD,
  ootdController.saveImage,
  ootdController.updateNewOutfitWithImageUrl,
  (req, res) => {
    console.log(req.body);
    console.log('POST /ootd/add/ route hit');
    console.log(res.locals.newOutfit);
    res.status(200).json(res.locals.newOutfit);
  }
);

router.post('/getAiImage', ootdController.getAiImage, (req, res) => {
  console.log(req.body);
  console.log('POST /ootd/getAiImage route hit');
  console.log(res.locals.onlineImageUrl);
  res.status(200).json({ image_url: res.locals.onlineImageUrl });
});

router.get('/get/:id', (req, res) => {
  console.log('GET /ootd/get/:id route hit');
  // console.log(req.body);
  //want to use req.params to retrieve data from the URL params
  console.log(req.params.id);
  res.status(200).json({});
});

router.delete('/delete/:id', ootdController.deleteOutfitById, (req, res) => {
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
