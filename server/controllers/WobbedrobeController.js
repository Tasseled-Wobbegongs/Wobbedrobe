const db = require('../models/db.js');

const wobbedrobeController = {};

wobbedrobeController.getAllItems = (req, res, next) => {
  const itemType = req.params.itemType;
  db.query(`SELECT * FROM ${itemType};`)
    .then((data) => data.rows)
    .then((data) => next())
    .catch((err) =>
      next({
        log:
          'Express error handler caught wobbedrobeController.getAllItems middleware error: ' +
          err,
        message: {
          err:
            'An error occurred when getting all ' + itemType + ' Err: ' + err,
        },
      })
    );
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
    ') RETURNING *;';

  const values = [user_id, category, color, style];
  if (itemType !== 'shoes') values.push(material);
  db.query(queryText, values)
    .then((data) => (res.locals[itemType] = data.rows[0]))
    .then(() => next())
    .catch((err) =>
      next({
        log:
          'Express error handler caught wobbedrobeController.addItems middleware error: ' +
          err,
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

wobbedrobeController.getTopsForUser = (req, res, next) => {
  const user_id = res.locals.userData.user_id;
  db.query(`SELECT * FROM tops WHERE user_id = ${user_id};`)
    .then((data) => data.rows)
    .then((data) => {
      res.locals.tops = data;
    })
    .then(() => next())
    .catch((err) =>
      next({
        log:
          'Express error handler caught wobbedrobeController.getTopsForUser middleware error: ' +
          err,
        message: {
          err: 'An error occurred when getting tops for user, Err: ' + err,
        },
      })
    );
};

wobbedrobeController.getBottomsForUser = (req, res, next) => {
  const user_id = res.locals.userData.user_id;
  db.query(`SELECT * FROM bottoms WHERE user_id = ${user_id};`)
    .then((data) => data.rows)
    .then((data) => {
      res.locals.bottoms = data;
    })
    .then(() => next())
    .catch((err) =>
      next({
        log:
          'Express error handler caught wobbedrobeController.getBottomsForUser middleware error: ' +
          err,
        message: {
          err: 'An error occurred when getting bottoms for user, Err: ' + err,
        },
      })
    );
};

wobbedrobeController.getOverallsForUser = (req, res, next) => {
  const user_id = res.locals.userData.user_id;
  db.query(`SELECT * FROM overalls WHERE user_id = ${user_id};`)
    .then((data) => data.rows)
    .then((data) => {
      res.locals.overalls = data;
    })
    .then(() => next())
    .catch((err) =>
      next({
        log:
          'Express error handler caught wobbedrobeController.getOverallsForUser middleware error: ' +
          err,
        message: {
          err: 'An error occurred when getting overalls for user, Err: ' + err,
        },
      })
    );
};

wobbedrobeController.getShoesForUser = (req, res, next) => {
  const user_id = res.locals.userData.user_id;
  db.query(`SELECT * FROM shoes WHERE user_id = ${user_id};`)
    .then((data) => data.rows)
    .then((data) => {
      res.locals.shoes = data;
    })
    .then(() => next())
    .catch((err) =>
      next({
        log:
          'Express error handler caught wobbedrobeController.getShoesForUser middleware error: ' +
          err,
        message: {
          err: 'An error occurred when getting shoes for user, Err: ' + err,
        },
      })
    );
};

wobbedrobeController.deleteItem = (req, res, next) => {
  const { itemType, id } = req.params;
  const idName =
    (itemType === 'shoes' ? 'shoes' : itemType.slice(0, itemType.length - 1)) +
    '_id';
  db.query(`DELETE FROM ${itemType} WHERE ${idName} = ${id} RETURNING *;`)
    .then((data) => data.rows[0])
    .then((data) => (res.locals.deletedItem = data))
    .then(() => next())
    .catch((err) =>
      next({
        log:
          'Express error handler caught wobbedrobeController.deleteItem middleware error: ' +
          err,
        message: {
          err: 'An error occurred when deleting an item, Err: ' + err,
        },
      })
    );
};

module.exports = wobbedrobeController;
