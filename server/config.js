'use strict';

module.exports = {
  db: {
    connection: `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}`,
    name: process.env.DB_NAME,
    options: {
      server: {
        socketOptions: {
          keepAlive: 1,
        },
      },
    },
  },
};
