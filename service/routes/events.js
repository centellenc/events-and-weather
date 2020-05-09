var express = require('express');

function create (eventsDataAccess, eventValidator) {
  const router = express.Router();
  router.post('/', function(req, res, next) {
    eventValidator.validate(req.body);
    eventsDataAccess.create(req.body);
    res.send('POST ok\n' + JSON.stringify(req.body));
  });
  
  router.put('/', function(req, res, next) {
    eventValidator.validate(req.body);
    eventsDataAccess.update(req.body);
    res.send('PUT ok\n' + JSON.stringify(req.body));
  });
  
  router.delete('/:id', function(req, res, next) {
    eventsDataAccess.remove(req.params.id);
    res.send('DELETE ok id:' + req.params.id);
  });
  
  router.get('/', function(req, res, next) {
    res.send(eventsDataAccess.get(null, req.query.limit));
  });
  
  router.get('/in/:location', function(req, res, next) {
    res.send(eventsDataAccess.get({location: req.params.location}, req.query.limit));
  });
  
  router.get('/on/:date', function(req, res, next) {
    res.send(eventsDataAccess.get({date: req.params.date}, req.query.limit));
  });
  
  router.get('/in/:location/on/:date', function(req, res, next) {
    res.send(eventsDataAccess.get({date: req.params.date, location: req.params.location}, req.query.limit));
  });
  
  router.get('/in/:location/on/:date', function(req, res, next) {
    res.send(eventsDataAccess.get({date: req.params.date, location: req.params.location}, req.query.limit));
  });

  return router;
}

module.exports.create = create;
