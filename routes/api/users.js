var express = require('express');
const AuthController = require('../../src/controllers/api/AuthController');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/auth/login',AuthController.login)
router.post('/auth/register',AuthController.register)


module.exports = router;
