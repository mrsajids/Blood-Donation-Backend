var express = require('express');
const isLogined = require('../middleware/isLogined');
var router = express.Router();

/* GET users listing. */
router.use(isLogined);
router.get('/test', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
  console.log(req.body);
  
  res.send('respond with a resource');
});

module.exports = router;
