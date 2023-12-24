const db = require('../models/db.js');

const ootdController = {};

ootdController.addOOTD = (req, res, next) => {
  const { user_id, shoes_id, top_id, bottom_id, overall_id } = req.body;
  let queryText = 'INSERT INTO outfits' + '(user_id, shoes_id, ';
  if (overall_id) {
    queryText += 'overall_id)';
  } else {
    queryText += 'top_id, bottom_id)';
  }

  queryText +=
    'VALUES ($1, $2, $3' + (overall_id ? '' : ', $4') + ') RETURNING *';

  const values = [user_id, shoes_id];
  if (overall_id) {
    values.push(overall_id);
  } else {
    values.push(top_id);
    values.push(bottom_id);
  }

  db.query(queryText, values)
    .then((data) => {
      console.log(data.rows);
      res.locals.outfit = data.rows[0];
    })
    .then(() => next())
    .catch((err) =>
      next({
        log: 'Express error handler caught ootdController.addOOTD middleware error',
        message: {
          err: 'An error occurred when adding an OOTD' + 'Err: ' + err,
        },
      })
    );
};

ootdController.getOutfitsForUser = (req, res, next) => {
  const user_id = res.locals.userData.user_id;
  db.query(`SELECT * FROM outfits WHERE user_id = ${user_id}`)
    .then((data) => data.rows)
    .then((data) => {
      console.log('outfits for user are', data);
      res.locals.outfits = data;
    })
    .then(() => next())
    .catch((err) =>
      next({
        log: 'Express error handler caught ootdController.getOutfitsForUser middleware error',
        message: {
          err: 'An error occurred when getting outfits for user, Err: ' + err,
        },
      })
    );
};

module.exports = ootdController;
