const express = require('express');
const { addProduct,
  getProductByID,
  updateProductByID,
  deleteProductByID,
  setProductAvailabilityByID,
  getAllProductList
} = require('../controllers/productController')
const passport = require('passport');
const { checkUserPermission } = require('../middlewares/RoleBasedUserPermission');
const productRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Product Management
 *     description: Product management related APIs 
 */

/**
 * @swagger
 * /addProduct:
 *   post:
 *     tags:
 *       - Product Management
 *     summary: Add a new product
 *     description: Add a new product to the system.
 *     security:
 *       - jwt: []  # Requires JWT token authentication
 *     parameters:
 *      - in: body
 *        name: addProduct 
 *        schema:
 *          type: object
 *          properties:
 *            product_name:
 *                 type: string
 *            product_brand:
 *                 type: string
 *            product_price:
 *                 type: number
 *            product_category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product added successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - JWT token not provided or invalid.
 */
productRouter.route('/addProduct')
  .post(passport.authenticate("jwt", { session: false }), checkUserPermission, addProduct)

/**
 * @swagger
 * /getProductByID/{product_id}:
 *   get:
 *     tags:
 *       - Product Management
 *     summary: Get a product by ID
 *     description: Retrieve a product by its unique ID.
 *     security:
 *       - jwt: []  # Requires JWT token authentication
 *     parameters:
 *       - name: product_id
 *         in: path
 *         description: The ID of the product to retrieve.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized - JWT token not provided or invalid.
 */
productRouter.route("/getProductByID/:product_id")
  .get(passport.authenticate("jwt", { session: false }), checkUserPermission, getProductByID);


/**
 * @swagger
 * /updateProductByID/{product_id}:
 *   put:
 *     tags:
 *       - Product Management
 *     summary: Update a product by ID
 *     description: Update the details of a product by its unique ID.
 *     security:
 *       - jwt: []  # Requires JWT token authentication
 *     parameters:
 *       - name: product_id
 *         in: path
 *         description: The ID of the product to update.
 *         required: true
 *         type: string
 *       - in: body
 *         name: updateProfile
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             product_name:
 *               type: string
 *               description: The updated name of the product.
 *             product_brand:
 *               type: string
 *               description: The updated brand of the product.
 *             product_price:
 *               type: number
 *               description: The updated price of the product.
 *             product_category:
 *               type: string
 *               description: The updated category of the product.
 *             product_seller:
 *               type: string
 *               description: The updated seller of the product.
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized - JWT token not provided or invalid.
 */
productRouter.route("/updateProductByID/:product_id")
  .put(passport.authenticate("jwt", { session: false }), checkUserPermission, updateProductByID);

/**
 * @swagger
 * /deleteProductByID/{product_id}:
 *   delete:
 *     tags:
 *       - Product Management
 *     summary: Delete a product by ID
 *     description: Delete a product by its unique ID.
 *     security:
 *       - jwt: []  # Requires JWT token authentication
 *     parameters:
 *       - name: product_id
 *         in: path
 *         description: The ID of the product to delete.
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       401:
 *         description: Unauthorized - JWT token not provided or invalid.
 */
productRouter.route("/deleteProductByID/:product_id")
  .delete(passport.authenticate("jwt", { session: false }), checkUserPermission, deleteProductByID);

  /**
 * @swagger
 * /setProductAvailabilityByID/{product_id}:
 *   put:
 *     tags:
 *       - Product Management
 *     summary: Set product availability by ID
 *     description: Set the availability of a product by its unique ID.
 *     security:
 *       - jwt: []  # Requires JWT token authentication
 *     parameters:
 *       - name: product_id
 *         in: path
 *         description: The ID of the product to update availability.
 *         required: true
 *         type: string
 *       - in: body
 *         name: setProductAvailabilityByID
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             is_available:
 *               type: boolean
 *               description: Indicates whether the product is available (true or false).
 *     responses:
 *       200:
 *         description: Product availability updated successfully
 *       404:
 *         description: Product not found
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - JWT token not provided or invalid.
 */
productRouter.route("/setProductAvailabilityByID/:product_id")
  .put(passport.authenticate("jwt", { session: false }), checkUserPermission, setProductAvailabilityByID);

/**
 * @swagger
 * /getAllProductList:
 *   get:
 *     tags:
 *       - Product Management
 *     summary: Get a list of all products
 *     description: Retrieve a list of all products based on query parameters.
 *     security:
 *       - jwt: []  # Requires JWT token authentication
 *     parameters:
 *       - name: product_category
 *         in: query
 *         description: Filter by product category (optional)
 *         required: false
 *         type: string
 *       - name: price_range
 *         in: query
 *         description: Filter by price range (optional). sample:- 1-1000
 *         required: false
 *         type: string
 *       - name: product_name
 *         in: query
 *         description: Filter by product name (optional)
 *         required: false
 *         type: string
 *       - name: page
 *         in: query
 *         description: Page number for pagination (optional)
 *         required: false
 *         type: integer
 *       - name: limit
 *         in: query
 *         description: Number of results per page (optional)
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: Successful response
 *       401:
 *         description: Unauthorized - JWT token not provided or invalid.
 */
productRouter.route('/getAllProductList')
  .get(passport.authenticate("jwt", { session: false }), checkUserPermission, getAllProductList)

module.exports.productRouter = productRouter