const db = require('../models/db.js');
const apiCall = require('../helpers/apiCall.js');
const fs = require('fs');
const path = require('path');

const ootdController = {};

ootdController.addOOTD = (req, res, next) => {
  console.log('ootdController.addOOTD', req.body);
  const { user_id, shoes, top, bottom, overall, userImageUrl, onlineImageUrl } =
    req.body;

  res.locals.userImageUrl = userImageUrl;
  res.locals.onlineImageUrl = onlineImageUrl;

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
    .then((data) => (res.locals.newOutfit = data.rows[0]))
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
  const outfit = req.body;
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

ootdController.saveImage = async (req, res, next) => {
  console.log('ootdController.saveImage');
  try {
    let imageBuffer;
    if (res.locals.onlineImageUrl) {
      const onlineImageUrl = res.locals.onlineImageUrl;
      console.log(onlineImageUrl);
      const imageResponse = await fetch(onlineImageUrl);
      const arrayBuffer = await imageResponse.arrayBuffer();
      imageBuffer = Buffer.from(arrayBuffer);
    } else if (res.locals.userImageUrl) {
      const userImageUrl = req.body.userImageUrl;
      const base64Data = userImageUrl.split(',')[1];
      imageBuffer = Buffer.from(base64Data, 'base64');
    } else {
      return next({
        log: 'Express error handler caught ootdController.saveOnlineImage middleware error',
        message: {
          err: 'Unknown error occurred when saving ootd image for user, Err ',
        },
      });
    }

    const targetDirectory = path.join(__dirname, '../downloadedImages');
    const imageName = `ootd${Date.now()}.png`;
    const imagePath = path.join(targetDirectory, imageName);

    fs.writeFileSync(imagePath, imageBuffer);
    console.log(`Image saved to ${imagePath}`);
    res.locals.localImageUrl = `/downloadedImages/${imageName}`;
    return next();
  } catch (err) {
    return next({
      log:
        'Express error handler caught ootdController.saveOnlineImage middleware error:' +
        err,
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

ootdController.deleteDependentOutfits = (req, res, next) => {
  const { itemType, id } = req.params;
  res.locals.deletedItemTyp = itemType;
  const idName =
    (itemType === 'shoes' ? 'shoes' : itemType.slice(0, itemType.length - 1)) +
    '_id';
  db.query(`DELETE FROM outfits WHERE ${idName} = ${id} RETURNING *;`)
    .then((data) => data.rows)
    .then((data) => (res.locals.deletedOutfits = data))
    .then(() => next())
    .catch((err) =>
      next({
        log:
          'Express error handler caught ootdController.deleteDependentOutfits middleware error: ' +
          err,
        message: {
          err:
            'An error occurred when deleting an outfit that depends on an item that is going to be deleted, Err: ' +
            err,
        },
      })
    );
};

ootdController.deleteOutfitById = (req, res, next) => {
  const id = req.params.id;
  db.query(`DELETE FROM outfits WHERE outfit_id = ${id} RETURNING *;`)
    .then((data) => data.rows[0])
    .then((data) => {
      res.locals.deletedOutfit = data;
      const pathToDelete = path.join(__dirname, `..${data.image_url}`);
      fs.unlinkSync(pathToDelete);
    })
    .then(() => next())
    .catch((err) =>
      next({
        log:
          'Express error handler caught ootdController.deleteOutfitById middleware error: ' +
          err,
        message: {
          err: 'An error occurred when deleting an outfit by id, Err: ' + err,
        },
      })
    );
};

module.exports = ootdController;
