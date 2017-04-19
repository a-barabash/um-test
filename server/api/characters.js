'use strict';

const Characters = require('../models/Characters');

module.exports = {
  list: (req, res) => {
    Characters.find({})
    .then(docs => res.send(docs));
  },

  add: (req, res) => {
    new Characters({
      name: req.body.name,
      height: req.body.height,
      mass: req.body.mass,
      hair_color: req.body.hair_color,
      skin_color: req.body.skin_color,
      eye_color: req.body.eye_color,
      birth_year: req.body.birth_year,
      is_male: req.body.is_male,
    })
    .save()
    .then(doc => res.json(doc))
    .catch(err => res.json(err));
  },

  setFavoriteState: (req, res) => {
    Characters.update({ _id: req.params.id }, { isFavorite: req.body.state }, { upsert: true })
    .then(result => res.json(result))
    .catch(err => res.json(err));
  },

  delete: (req, res) => {
    Characters.remove({ _id: req.params.id })
    .then(result => res.json(result))
    .catch(err => res.json(err));
  },
};

