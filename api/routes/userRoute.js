'use strict';

const express = require('express');
const { User } = require('../models');
//const { Course } = require('../models');
const { authenticateUser } = require('../middleware/auth-user');
const bcryptjs = require('bcryptjs');
const router = express.Router();


// This array is used to keep track of user records
// as they are created.
const user = [];

/* Handler function to wrap each route. */
function asyncHandler(cb){
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
        // Forward error to the global error handler
        next(error);
      }
    }
  }

//GET route that will return all properties and values for the currently authenticated User along with a `200` HTTP status code.
router.get('/users', authenticateUser, asyncHandler(async(req, res)=>{
  const user = req.currentUser;
  res.status(200),
  res.json({
    firstName: user.firstName,
      lastName: user.lastName,
      emailAddress: user.emailAddress,
      id: user.id,
  })
}))

//POST route that will create a new user, set the `Location` header to "/", and return a `201` HTTP status code and no content.
//Extra credit: check for and handle `SequelizeUniqueConstraintError`errors ;
//Extra credit: if `SequelizeUniqueConstraintError` is thrown a `400` HTTP status code and an error message should be returned.
router.post('/users', asyncHandler(async (req, res) => {
  const user = req.body;
  try {
    if(user.password){
      user.password = bcryptjs.hashSync(user.password, 10);
    }

    const newUser = await User.create(user);
    res.status(201).location('/').end();
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      const errors = error.errors.map(err => err.message);
      res.status(400).json({ errors });   
    } else {
      throw error;
    }
  }
}));
  module.exports = router;