var express = require('express');

function create(eventsApp) {
  const router = express.Router();
  router.post('/', eventsApp.post);
  router.put('/', eventsApp.put);
  router.delete('/:id', eventsApp.delete);
  router.get('/', eventsApp.get);
  router.get('/in/:location', eventsApp.get);
  router.get('/on/:date', eventsApp.get);
  router.get('/in/:location/on/:date', eventsApp.get);
  router.get('/on/:date/in/:location', eventsApp.get);
  return router;
}

module.exports.create = create;
