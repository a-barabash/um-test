'use strict';

require('dotenv').config();
const Characters = require('../server/models/Characters');

exports.up = (next) => {
  Characters.bulkWrite([
    {
      insertOne: {
        document: {
          name: 'Luke Skywalker',
          height: 172,
          mass: 77,
          hair_color: 'blond',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          is_male: true
        },
      },
    },
    {
      insertOne: {
        document: {
          name: 'C-3PO',
          height: 167,
          mass: 75,
          hair_color: 'n/a',
          skin_color: 'gold',
          eye_color: 'yellow',
          birth_year: '112BBY',
          is_male: true
        },
      },
    },
    {
      insertOne: {
        document: {
          name: 'Leia Organa',
          height: 150,
          mass: 49,
          hair_color: 'brown',
          skin_color: 'light',
          eye_color: 'brown',
          birth_year: '19BBY',
          is_male: false
        },
      },
    },
    {
      insertOne: {
        document: {
          name: 'Darth Vader',
          height: 202,
          mass: 136,
          hair_color: 'none',
          skin_color: 'white',
          eye_color: 'yellow',
          birth_year: '41.9BBY',
          is_male: true
        },
      },
    },
  ])
  .then(() => next());
};

exports.down = (next) => {
  Characters.remove({})
  .then(() => next());
};



