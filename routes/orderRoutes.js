const express = require('express');
const {
  createOrder,
  getOrderByID,
  updateOrderStatusByID,
  cancelOrderByID,
  getAllOrderList
} = require('../controllers/orderController')
const passport = require('passport');
const { checkUserPermission } = require('../middlewares/RoleBasedUserPermission');
const orderRouter = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Order Management
 *     description: Order management related APIs 
 */

/**
 * @swagger
 * /createOrder:
 *   post:
 *     tags:
 *       - Order Management
 *     summary: Create a new order
 *     description: Create a new order with product information and delivery address.
 *     security:
 *       - jwt: []  # Requires JWT token authentication
 *     parameters:
 *      - in: body
 *        name: createOrder 
 *        schema:
 *          type: object
 *          properties:
 *            product_id:
 *              type: string
 *              description: The ID of the product being ordered.
 *            order_price:
 *              type: number
 *              description: The total price of the order.
 *            order_address:
 *              type: string
 *              description: The delivery address for the order.
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       401:
 *         description: Unauthorized - JWT token not provided or invalid.
 */
orderRouter.route('/createOrder')
  .post(passport.authenticate("jwt", { session: false }), checkUserPermission, createOrder)

/**
 * @swagger
 * /getOrderByID/{order_id}:
 *   get:
 *     tags:
 *       - Order Management
 *     summary: Get an order by ID
 *     description: Retrieve an order by its unique ID.
 *     security:
 *       - jwt: []  # Requires JWT token authentication
 *     parameters:
 *       - name: order_id
 *         in: path
 *         description: The ID of the order to retrieve.
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Successful response
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized - JWT token not provided or invalid.
 */
orderRouter.route("/getOrderByID/:order_id")
  .get(passport.authenticate("jwt", { session: false }), checkUserPermission, getOrderByID);

/**
 * @swagger
 * /update_order_statusByID/{order_id}:
 *   put:
 *     tags:
 *       - Order Management
 *     summary: Update order status by ID
 *     description: Update the status of an order by its unique ID.
 *     security:
 *       - jwt: []  # Requires JWT token authentication
 *     parameters:
 *       - name: order_id
 *         in: path
 *         description: The ID of the order to update.
 *         required: true
 *         type: string
 *       - in: body
 *         name: setProductAvailabilityByID
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             order_status:
 *               type: string
 *               description:  update status of the order.
 *     responses:
 *       200:
 *         description: Order status updated successfully
 *       400:
 *         description: Bad request - Invalid input data
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized - JWT token not provided or invalid.
 */
orderRouter.route("/update_order_statusByID/:order_id")
  .put(passport.authenticate("jwt", { session: false }), checkUserPermission, updateOrderStatusByID);

/**
 * @swagger
 * /cancelOrderByID/{order_id}:
 *   delete:
 *     tags:
 *       - Order Management
 *     summary: Cancel an order by ID
 *     description: Cancel an order by its unique ID.
 *     security:
 *       - jwt: []  # Requires JWT token authentication
 *     parameters:
 *       - name: order_id
 *         in: path
 *         description: The ID of the order to cancel.
 *         required: true
 *         type: string
 *     responses:
 *       204:
 *         description: Order canceled successfully
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized - JWT token not provided or invalid.
 */
orderRouter.route("/cancelOrderByID/:order_id")
  .delete(passport.authenticate("jwt", { session: false }), checkUserPermission, cancelOrderByID);

/**
 * @swagger
 * /getAllOrderList:
 *   get:
 *     tags:
 *       - Order Management
 *     summary: Get a list of all orders
 *     description: Retrieve a list of all orders based on query parameters.
 *     security:
 *       - jwt: []  # Requires JWT token authentication
 *     parameters:
 *       - name: product_id
 *         in: query
 *         description: Filter by product ID (optional)
 *         required: false
 *         type: string
 *       - name: user_id
 *         in: query
 *         description: Filter by user ID (optional)
 *         required: false
 *         type: string
 *       - name: order_price_range
 *         in: query
 *         description: Filter by order price range (optional)
 *         required: false
 *         type: string
 *       - name: order_price
 *         in: query
 *         description: Filter by exact order price (optional)
 *         required: false
 *         type: number
 *       - name: date
 *         in: query
 *         description: Filter by order date (optional)
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
orderRouter.route('/getAllOrderList')
  .get(passport.authenticate("jwt", { session: false }), checkUserPermission, getAllOrderList)

module.exports.orderRouter = orderRouter