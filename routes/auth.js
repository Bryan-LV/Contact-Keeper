const express = require('express');
const router = express.Router();

// @route GET api/auth
// @desc Get logged in user
// @access Private

router.get('/', function(req,res){
  res.send('Get logged in user');
})

// @route POST api/auth
// @desc Auth user and get token
// @access Public

router.post('/', function(req,res){
  res.send('Logged in user');
})

module.exports = router;