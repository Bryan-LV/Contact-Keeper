const express = require('express');
const router = express.Router();

// @route POST api/users
// @desc Creates a user
// @access Public

router.get('/', function( req,res){
  res.send('helo')
})

router.post('/', function(req,res){
  res.send('Create a User Account');
})

module.exports = router;