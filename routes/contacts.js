const express = require('express');
const router = express.Router();

// @route GET api/contact
// @desc Get all users contacts
// @access Private

router.get('/', function(req,res){
  res.send('Get all user contacts');
})

// @route POST api/contact
// @desc Get all users contacts
// @access Private

router.post('/', function(req,res){
  res.send('Create a contact');
})

// @route PUT api/contact/:id
// @desc Update a contact
// @access Private

router.put('/:id', function(req,res){
  res.send('Update Contact');
})

// @route Delete api/contact/:id
// @desc Delete contact
// @access Private
router.delete('/:id', function(req,res){
  res.send('Delete a Contact')
})


module.exports = router;