const express = require('express');
const { 
  createOrder,
  getOrderByID,
  updateOrderStatusByID,
  cancelOrderByID,
  getAllOrderList
   } = require('../controllers/orderController')
const passport = require('passport')
const orderRouter = express.Router();

// Order routes
orderRouter.route('/createOrder').post( passport.authenticate("jwt", { session: false }) , createOrder)

orderRouter.route("/getOrderByID/:order_id")
  .get( passport.authenticate("jwt", { session: false }), getOrderByID);
orderRouter.route("/update_order_statusByID/:order_id")
  .put( passport.authenticate("jwt", { session: false }), updateOrderStatusByID);
orderRouter.route("/cancelOrderByID/:order_id")
  .delete( passport.authenticate("jwt", { session: false }), cancelOrderByID);

orderRouter.route('/getAllOrderList')
  .get( passport.authenticate("jwt", { session: false }) ,getAllOrderList)

module.exports.orderRouter = orderRouter