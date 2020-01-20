const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const crypt = require('bcryptjs');
const config = require('config');
const auth = require('../middleware/auth');
const User = require("../models/users");

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route POST api/auth
// @desc Auth user and get token
// @access Public

router.post('/', [
  check('email', 'Please enter an email').isEmail(),
  check('password',  'Password needs to be at least 6 characters').isLength({min:6})
], async function(req,res){
  // validate
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array()});
  }

  const {email, password} = req.body;
  
  try {
    //find user
    let user = await User.findOne({email});
    if(!user){
      return res.status(400).json({msg: 'Cannot find a user with that email'});
    }
    // check password
    const isPassword = await crypt.compare(password, user.password)
    if(!isPassword){
      return res.status(400).json({msg:'Password does not match what we have!'});
    }

    // create token
    const payload = {
      user: {
        id: user.id
      }
    }
    jwt.sign(payload, config.get('jwtSecret'),{expiresIn:36000}, function(error, token){
      if(error){
        throw 'Could not create token'
      } 
      return res.json({token: token});
    })

  } catch (error) {
    return res.status(500).json({error: error});
  }
 
})

module.exports = router;