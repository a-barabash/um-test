'use strict';

const Characters = require('../models/Characters');

module.exports = {
  list: (req, res) => {
    Characters.find({})
    .then(docs => res.send(docs))
    .catch(err => res.status(500).json(err));
  },

  save: (req, res) => {
    const doc = {
      name: req.body.character.name,
      height: req.body.character.height,
      mass: req.body.character.mass,
      hair_color: req.body.character.hair_color,
      skin_color: req.body.character.skin_color,
      eye_color: req.body.character.eye_color,
      birth_year: req.body.character.birth_year,
      is_male: req.body.character.is_male,
    };

    if (typeof req.body.character._id !== 'undefined') {
      doc._id = req.body.character._id;
    }

    const character = new Characters(doc);
    character.isNew = !doc._id;

    character
    .save()
    .then(doc => res.json(doc))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.json({ errors: err.errors });
      } else {
        res.status(500).json(err);
      }
    });
  },

  setFavoriteState: (req, res) => {
    Characters.update({ _id: req.params.id }, { isFavorite: req.body.state }, { upsert: true })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
  },

  delete: (req, res) => {
    Characters.remove({ _id: req.params.id })
    .then(result => res.json(result))
    .catch(err => res.status(500).json(err));
  },
};

