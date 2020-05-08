var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send({ description: "Nice stuff", date: new Date() });
});

router.get('/in/:location', function(req, res, next) {
  res.send(req.params);
});

router.get('/on/:date', function(req, res, next) {
  res.send(req.params);
});

router.get('/in/:location/on/:date', function(req, res, next) {
  res.send(req.params);
});

router.get('/in/:location/on/:date', function(req, res, next) {
  res.send(req.params);
});



router.put('/', function(req, res, next) {
  res.send('put ok');
});

router.delete('/', function(req, res, next) {
  res.send('put ok');
});


module.exports = router;
