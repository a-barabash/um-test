'use strict';

const express = require('express');

const version = require('../package.json')['api-version'];
const characters = require('./api/characters');

const router = new express.Router();

router.use((req, res, next) => {
  res.header('Version', version);
  next();
});

router.route('/characters/list').get(characters.list);
router.route('/characters/save').post(characters.save);
router.route('/characters/:id/set-favorite-state').patch(characters.setFavoriteState);
router.route('/characters/:id/delete').delete(characters.delete);

module.exports = router;
