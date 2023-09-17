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

// Order routes
orderRouter.route('/createOrder')
  .post(passport.authenticate("jwt", { session: false }), checkUserPermission, createOrder)

orderRouter.route("/getOrderByID/:order_id")
  .get(passport.authenticate("jwt", { session: false }), checkUserPermission, getOrderByID);
orderRouter.route("/update_order_statusByID/:order_id")
  .put(passport.authenticate("jwt", { session: false }), checkUserPermission, updateOrderStatusByID);
orderRouter.route("/cancelOrderByID/:order_id")
  .delete(passport.authenticate("jwt", { session: false }), checkUserPermission, cancelOrderByID);

orderRouter.route('/getAllOrderList')
  .get(passport.authenticate("jwt", { session: false }), checkUserPermission, getAllOrderList)

module.exports.orderRouter = orderRouter