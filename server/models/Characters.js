'use strict';

const mongoose = require('../mongoose');

const schema = [
  {
    name: { type: String, required: true },
    height: { type: Number, required: true },
    mass: { type: Number, required: true },
    hair_color: { type: String, required: true },
    skin_color: { type: String, required: true },
    eye_color: { type: String, required: true },
    birth_year: { type: String, required: true },
    is_male: { type: Boolean, required: true },
    isFavorite: { type: Boolean, default: false },
  },
  { strict: true },
];

const Characters = new mongoose.Schema(...schema);

module.exports = mongoose.model('Characters', Characters, 'characters');
