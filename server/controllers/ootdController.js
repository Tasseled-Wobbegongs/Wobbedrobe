const db = require('../models/db.js');
const apiCall = require('../helpers/apiCall.js');
const fs = require('fs');
const path = require('path');

const ootdController = {};

ootdController.addOOTD = (req, res, next) => {
  const { user_id, shoes, top, bottom, overall } = req.body;
  let queryText = 'INSERT INTO outfits' + '(user_id, shoes_id, ';
  if (overall) {
    queryText += 'overall_id)';
  } else {
    queryText += 'top_id, bottom_id)';
  }

  queryText += 'VALUES ($1, $2, $3' + (overall ? '' : ', $4') + ') RETURNING *';

  const values = [user_id, shoes.shoes_id];
  res.locals.user_id = user_id;
  res.locals.outfit = {};
  res.locals.outfit.shoes = shoes;

  if (overall) {
    values.push(overall.overall_id);
    res.locals.outfit.overall = overall;
  } else {
    values.push(top.top_id);
    values.push(bottom.bottom_id);
    res.locals.outfit.top = top;
    res.locals.outfit.bottom = bottom;
  }

  db.query(queryText, values)
    .then((data) => {
      console.log(data.rows);
      res.locals.newOutfit = data.rows[0];
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

ootdController.getAiImage = (req, res, next) => {
  const outfit = res.locals.outfit;
  let prompt = 'Please generate an outfit image with the following items: ';
  for (const itemType of Object.keys(outfit)) {
    const { color, category, style } = outfit[itemType];
    const material = itemType === 'shoes' ? '' : outfit[itemType].material;
    prompt += `a ${style} ${material} ${category} ${itemType} in the color ${color}; `;
  }
  prompt += 'Please focus on accurately representing the specified colors.';
  console.log(prompt);
  apiCall(prompt, 'image')
    .then((imageUrl) => (res.locals.onlineImageUrl = imageUrl))
    .then(() => next())
    .catch((err) =>
      next({
        log: 'Express error handler caught ootdController.getAiImage middleware error',
        message: {
          err: 'An error occurred when getting Ai image' + 'Err: ' + err,
        },
      })
    );
};

ootdController.saveAiImage = async (req, res, next) => {
  try {
    const onlineImageUrl = res.locals.onlineImageUrl;
    console.log(onlineImageUrl);
    const imageResponse = await fetch(onlineImageUrl);
    const arrayBuffer = await imageResponse.arrayBuffer();
    const imageBuffer = Buffer.from(arrayBuffer);

    const targetDirectory = path.join(__dirname, '../downloadedImages');
    const imageName = `ootd${Date.now()}.png`;
    const imagePath = path.join(targetDirectory, imageName);

    fs.writeFileSync(imagePath, imageBuffer);
    console.log(`Image saved to ${imagePath}`);
    res.locals.localImageUrl = `/downloadedImages/${imageName}`;
    return next();
  } catch (err) {
    return next({
      log: 'Express error handler caught ootdController.saveAiImage middleware error',
      message: {
        err: 'An error occurred when saving ootd image for user, Err: ' + err,
      },
    });
  }
};

ootdController.updateNewOutfitWithImageUrl = (req, res, next) => {
  db.query(
    'UPDATE outfits SET image_url = $1 WHERE outfit_id = $2 RETURNING *;',
    [res.locals.localImageUrl, res.locals.newOutfit.outfit_id]
  )
    .then((data) => (res.locals.newOutfit = data.rows[0]))
    .then(() => next())
    .catch((err) =>
      next({
        log:
          'Express error handler caught ootdController.updateNewOutfitWithImageUrl middleware error' +
          err,
        message: {
          err:
            'An error occurred when updating outfit imageURL for user, Err: ' +
            err,
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
