const express = require('express');
const { SignUp, SignIn, getCurrentUser, updateCurrentUserProfile, getAllUserList
} = require('../controllers/userController')
const passport = require('passport');
const { checkUserPermission } = require('../middlewares/RoleBasedUserPermission');
const userRouter = express.Router();


/**
 * @swagger
 * tags:
 *   - name: User Management
 *     description: User management related APIs 
 */

/**
 * @swagger
 * /SignUp:
 *   post:
 *     tags:
 *       - User Management
 *     summary: Sign-Up with this api.
 *     description: Register user on FMCG-APP using this api.
 *     parameters:
 *      - in: body
 *        name: Sign-Up 
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *            email:
 *              type: string
 *            password:
 *              type: string
 *            role:
 *              type: string
 *     responses:
 *       201:
 *         description: Created
 */
userRouter.route('/SignUp').post(SignUp)

/**
 * @swagger
 * /SignIn:
 *   post:
 *     tags:
 *       - User Management
 *     summary: Sign-In user with email and password.
 *     description: Sign in user with email and password on FMCG-APP using this api.
 *     parameters:
 *      - in: body
 *        name: Sign-In
 *        schema:
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *     responses:
 *       200:
 *         description: Sign in successful
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */
userRouter.route('/SignIn').post(SignIn);


/**
 * @swagger
 * /GetCurrentProfile:
 *   get:
 *     tags:
 *       - User Management
 *     summary: Get the current user's profile
 *     description: Get the profile information of the currently authenticated user.
 *     security:
 *       - jwt: []  # Requires JWT token authentication
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized - JWT token not provided or invalid.
 */

userRouter.route("/GetCurrentProfile").get(passport.authenticate("jwt", { session: false }), checkUserPermission, getCurrentUser);

/**
 * @swagger
 * /UpdateProfile:
 *   put:
 *     tags:
 *       - User Management
 *     summary: Update the user's profile
 *     description: Update the profile information of the currently authenticated user.
 *     security:
 *       - jwt: []  # Requires JWT token authentication
 *     parameters:
 *       - in: body
 *         name: UpdateProfile
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Enter new name for the user.
 *             password:
 *               type: string
 *               description: Enter new password for the user.
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       401:
 *         description: Unauthorized - JWT token not provided or invalid.
 */
userRouter.route("/UpdateProfile")
  .put(passport.authenticate("jwt", { session: false }), checkUserPermission, updateCurrentUserProfile);


/**
 * @swagger
 * /getAllUserList:
 *   get:
 *     tags:
 *       - User Management
 *     summary: Get a list of all users.
 *     description: Retrieve a list of all users in the system based on query parameters.
 *     security:
 *       - jwt: []  # Requires JWT token authentication
 *     parameters:
 *       - name: name
 *         in: query
 *         description: Filter by user name (optional)
 *         type: string
 *       - name: email
 *         in: query
 *         description: Filter by user email (optional)
 *         type: string
 *       - name: role
 *         in: query
 *         description: Filter by user role (optional)
 *         type: string
 *       - name: page
 *         in: query
 *         description: Page number for pagination (optional)
 *         type: integer
 *       - name: limit
 *         in: query
 *         description: Number of results per page (optional)
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized - JWT token not provided or invalid.
 */
userRouter.route('/getAllUserList')
  .get(passport.authenticate("jwt", { session: false }), checkUserPermission, getAllUserList)

module.exports.userRouter = userRouter