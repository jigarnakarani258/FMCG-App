const express = require('express');
const { addProduct,
  getProductByID,
  updateProductByID,
  deleteProductByID,
  setProductAvailabilityByID,
  getAllProductList
   } = require('../controllers/productController')
const passport = require('passport')
const productRouter = express.Router();

// Product routes
productRouter.route('/addProduct').post( passport.authenticate("jwt", { session: false }) , addProduct)

productRouter.route("/getProductByID/:product_id")
  .get( passport.authenticate("jwt", { session: false }), getProductByID);
productRouter.route("/updateProductByID/:product_id")
  .put( passport.authenticate("jwt", { session: false }), updateProductByID);
productRouter.route("/deleteProductByID/:product_id")
  .delete( passport.authenticate("jwt", { session: false }), deleteProductByID);

productRouter.route("/setProductAvailabilityByID/:product_id")
  .put( passport.authenticate("jwt", { session: false }), setProductAvailabilityByID);


productRouter.route('/getAllProductList')
  .get( passport.authenticate("jwt", { session: false }) ,getAllProductList)

module.exports.productRouter = productRouter