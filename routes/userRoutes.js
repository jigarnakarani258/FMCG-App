const express = require('express');
const { SignUp , SignIn ,getCurrentUser, updateCurrentUserProfile , getAllUserList
   } = require('../controllers/userController')
const passport = require('passport')
const userRouter = express.Router();

// User management routes
userRouter.route('/SignUp').post(SignUp)
userRouter.route('/SignIn').post(SignIn)

userRouter.route("/GetCurrentProfile")
  .get( passport.authenticate("jwt", { session: false }), getCurrentUser);
userRouter.route("/UpdateProfile")
  .put( passport.authenticate("jwt", { session: false }), updateCurrentUserProfile);


// Admin permission routes
userRouter.route('/getAllUserList')
  .get( passport.authenticate("jwt", { session: false }) ,getAllUserList)

module.exports.userRouter = userRouter