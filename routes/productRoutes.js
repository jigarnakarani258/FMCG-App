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

// Product routes
productRouter.route('/addProduct')
  .post(passport.authenticate("jwt", { session: false }), checkUserPermission, addProduct)

productRouter.route("/getProductByID/:product_id")
  .get(passport.authenticate("jwt", { session: false }), checkUserPermission, getProductByID);
productRouter.route("/updateProductByID/:product_id")
  .put(passport.authenticate("jwt", { session: false }), checkUserPermission, updateProductByID);
productRouter.route("/deleteProductByID/:product_id")
  .delete(passport.authenticate("jwt", { session: false }), checkUserPermission, deleteProductByID);

productRouter.route("/setProductAvailabilityByID/:product_id")
  .put(passport.authenticate("jwt", { session: false }), checkUserPermission, setProductAvailabilityByID);


productRouter.route('/getAllProductList')
  .get(passport.authenticate("jwt", { session: false }), checkUserPermission, getAllProductList)

module.exports.productRouter = productRouter