const express = require('express');
const path = require('path');
const Controller = require('./WobbedrobeController');

const app = express();
const PORT = 3000; 

app.use();


app.post('/', Controller.createWobbedrobe, (req, res) => {
  return res.status(200).json({});
});

app.get('/', Controller.getWobbedrobe, (req, res) => {
  return res.status(200).json({});
});


app.patch('/', Controller.updateWobbedrobe, (req, res) => {
  return res.status(200).json({});
});


app.delete('/', Controller.deleteWobbedrobe, (req, res) => {
  return res.status(200).json({});
});


// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
app.use((err, req, res, next) => {
    const defaultErr = {
      log: 'Express error handler caught unknown middleware error',
      status: 500,
      message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
});
  

app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));

module.exports = app; 