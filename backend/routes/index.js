const express = require('express');
const router = express.Router();
const globalRouter = require('./global.route');

const apiRouter = (app) => {

  app.use('/api', router);
  router.use('/global', globalRouter);

}

module.exports = apiRouter;
