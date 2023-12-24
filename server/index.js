const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const app = express();
const PORT = 8080;

app.use(cors());

app.use(express.json());
app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/downloadedImages', express.static('downloadedImages'));

const userRouter = require('./routes/userRouter.js');
const ootdRouter = require('./routes/ootdRouter.js');
const wobbedrobeItemsRouter = require('./routes/wobbedrobeItemsRouter.js');

app.use('/user', userRouter);
app.use('/wobbedrobe', wobbedrobeItemsRouter);
app.use('/ootd', ootdRouter);

app.get('*', (req, res) => {
  console.log('GET * route hit');
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
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
