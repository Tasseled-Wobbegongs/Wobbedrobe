const db = require('../models/db.js');

const wobbedrobeController = {};

wobbedrobeController.getAllItems = (req, res, next) => {
  const itemType = req.params.itemType;
  const queryText = 'SELECT * FROM ' + itemType;
  db.query(queryText)
    .then((data) => data.rows)
    .then((data) => {
      console.log(data);
      return next();
    });
};

wobbedrobeController.addItem = (req, res, next) => {
  const itemType = req.params.itemType;
  const { user_id, category, color, style, material } = req.body;
  const queryText =
    `INSERT INTO ${itemType}` +
    '(user_id, category, color, style' +
    (itemType === 'shoes' ? '' : ', material') +
    ') VALUES($1, $2, $3, $4' +
    (itemType === 'shoes' ? '' : ', $5') +
    ') RETURNING *';

  const values = [user_id, category, color, style];
  if (itemType !== 'shoes') values.push(material);
  db.query(queryText, values)
    .then((data) => (res.locals[itemType] = data.rows))
    .then(() => next())
    .catch((err) =>
      next({
        log: 'Express error handler caught wobbedrobeController.addItems middleware error',
        message: {
          err:
            'An error occurred when adding an item of ' +
            itemType +
            'Err: ' +
            err,
        },
      })
    );
};

wobbedrobeController.getWardrobeForUser = (req, res, next) => {};

module.exports = wobbedrobeController;
