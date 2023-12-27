const express = require('express');
const cors = require('cors');
const path = require('path');
// const Controller = require('./controllers/wobbedrobeController.js');
// const userController = require('./controllers/userController.js');
// const cookieController = require('./controllers/cookieController.js');
// const sessionController = require('./controllers/sessionController.js');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter.js');
const ootdRouter = require('./routes/ootdRouter.js');
const wobbedrobeItemsRouter = require('./routes/wobbedrobeItemsRouter.js');
require('dotenv').config();

const app = express();
const PORT = 8080;

const MONGO_URI = process.env.MONGO_URI;
console.log(MONGO_URI);
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Database connected..');
    })
    .catch(() => {
        console.log('ERROR: DATABASE NOT CONNECTED!');
    });


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../client/build')));
app.use('/downloadedImages', express.static('downloadedImages'));

app.use('/user', userRouter);
app.use('/wobbedrobe', wobbedrobeItemsRouter);
app.use('/ootd', ootdRouter);

app.get('*', (req, res) => {
  console.log('GET * route hit');
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Unknown route handler
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

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
