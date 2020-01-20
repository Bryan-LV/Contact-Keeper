const express = require("express");
const router = express.Router();
const {check, validationResult } = require("express-validator");
const crypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require('config');
const User = require("../models/users");

// @route GET api/users
// @desc Fetches all users
// @access Public

router.get('/', async (req,res) => {
  let users = await User.find({}).select('-password');
  res.send(users);
})

// @route POST api/users
// @desc Creates a user
// @access Public

router.post("/", [
  check("name", "Please enter a name").not().isEmpty(),
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Please enter a password with 6 or more characters").isLength({min:6})
], async function(req,res){

  // validation check
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors: errors.array() })
  }

  const { name, email, password } = req.body;

  try {
    // check if user already exists
   let user = await User.findOne({email}) 
    if(user){
      return res.status(400).json({msg: "User already exists"})
    }

    user = new User({name,email,password})

    // hash the password
    const salt = await crypt.genSalt(10);
    user.password = await crypt.hash(password, salt);
    await user.save();
    
    // create jwt
    const payload = {
      user:{
        id: user.id
      }
    }
    jwt.sign(payload,config.get('jwtSecret'),{ expiresIn:36000}, function(err, token){
      if(err){
        throw err
      }
      return res.json({token});
    })

  } catch (error) {
    return res.status(500).json({msg: error});
  }
})

module.exports = router;