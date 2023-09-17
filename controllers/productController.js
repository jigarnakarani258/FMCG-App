const { Products } = require('../models/productModel')
const { messages } = require('../utility/messages');
const { AppError } = require('../utility/appError');

//create Product API, Authenticated with Passport JS
const addProduct = async (req, res, next) => {

  try {
    const { product_name, product_brand, product_price, product_category } = req.body;

    //product_seller id get from token
    let product_seller = req.user._id

    let product = new Products({
      product_name: product_name,
      product_brand: product_brand,
      product_price: product_price,
      product_category: product_category,
      product_seller: product_seller
    });

    //check this logic one more time-and operator use in query otherwise
    const ValidProduct = await Products.findOne({ product_name: product_name, product_seller: product_seller });
    if (ValidProduct) {
      return res.status(400).json({
        status: "fail",
        requestAt: req.requestTime,
        message: messages.product_already_addded_by_seller
      });
    }

    product
      .save()
      .then(() => {
        return res.status(201).json({
          status: "success",
          requestAt: req.requestTime,
          data: {
            newProduct: {
              id: product._id,
              product_name: product.product_name,
              product_brand: product.product_brand,
              product_price: product.product_price,
              product_category: product.product_category,
              product_seller: product.product_seller
            },
          },
          message: messages.product_added_successfully
        });
      })
      .catch(err => {
        return next(new AppError(err, 401));
      });
  } catch (err) {
    return next(new AppError(err, 401));
  }


};

//getProductByID API , Authenticated with Passport JS
const getProductByID = async (req, res, next) => {

  try {
    //user id get from token
    const user_id = req.user._id

    let product_id = req.params.product_id
    let getProduct = await Products.findById(product_id)

    if (getProduct === undefined || getProduct === "" || getProduct === null) {
      return res.status(401).json({
        status: "Bad Request",
        requestAt: req.requestTime,
        errorCode: 404,
        message: messages.product_not_found_with_provided_id
      });
    }
    else {
      return res.status(200).send({
        status: "success",
        requestAt: req.requestTime,
        product: getProduct,
        message: messages.product_get_successfully,
      });
    }
  } catch (err) {
    return next(new AppError(err, 401));
  }


};

//updateProductByID API , Authenticated with Passport JS
const updateProductByID = async (req, res, next) => {

  try {
    const id = req.user._id

    let product_id = req.params.product_id
    let { product_name, product_brand, product_price, product_category, product_seller } = req.body;
    let updateProductData;

    updateProductData = {
      product_name: product_name,
      product_brand: product_brand,
      product_price: product_price,
      product_category: product_category,
      product_seller: product_seller
    }

    let updatedProduct = await Products.findByIdAndUpdate(product_id, updateProductData, {
      new: true,
      runValidators: true,
    });
    if (updatedProduct === undefined || updatedProduct === "" || updatedProduct === null) {
      return res.status(401).json({
        status: "Bad Request",
        requestAt: req.requestTime,
        errorCode: 404,
        message: messages.product_not_found_with_provided_id
      });
    }
    else {
      return res.status(200).json({
        status: "Success",
        requestAt: req.requestTime,
        updatedProduct: updatedProduct,
        message: messages.product_updated_successfully,
      });
    }
  }
  catch (err) {
    return next(new AppError(err, 401));
  }

};

//make_not_Available_ProductByID API , Authenticated with Passport JS
const make_not_Available_ProductByID = async (req, res, next) => {

  try {
    const id = req.user._id

    let product_id = req.params.product_id

    let updatedProduct = await Products.findByIdAndUpdate(product_id, { is_available: false }, {
      new: true,
      runValidators: true,
    });
    if (updatedProduct === undefined || updatedProduct === "" || updatedProduct === null) {
      return res.status(401).json({
        status: "Bad Request",
        requestAt: req.requestTime,
        errorCode: 404,
        message: messages.product_not_found_with_provided_id
      });
    }
    else {
      return res.status(200).json({
        status: "Success",
        requestAt: req.requestTime,
        updatedProduct: updatedProduct,
        message: messages.product_is_now_not_available,
      });
    }
  }
  catch (err) {
    return next(new AppError(err, 401));
  }


};

//deleteProductByID API , Authenticated with Passport JS
const deleteProductByID = async (req, res, next) => {

  try {
    //user id get from token
    const user_id = req.user._id

    let product_id = req.params.product_id
    let deleteProduct = await Products.findByIdAndDelete(product_id)

    if (deleteProduct === undefined || deleteProduct === "" || deleteProduct === null) {
      return res.status(401).json({
        status: "Bad Request",
        requestAt: req.requestTime,
        errorCode: 404,
        message: messages.product_not_found_with_provided_id
      });
    }
    else {
      return res.status(200).send({
        status: "success",
        requestAt: req.requestTime,
        Product_id: deleteProduct._id,
        message: messages.product_deleted_successfully,
      });
    }
  } catch (err) {
    return next(new AppError(err, 401));
  }

};

//change logic - add pagination
//getAllProductList API , Authenticated with Passport JS
const getAllProductList = async (req, res, next) => {

  let productList = await Products.find({}, { __v: 0 })

  return res.status(200).send({
    status: "success",
    requestAt: req.requestTime,
    NoResults: productList.length,
    data: {
      products: productList,
    },
  });
};

module.exports = {
  addProduct,
  getProductByID,
  updateProductByID,
  deleteProductByID,
  make_not_Available_ProductByID,
  getAllProductList
}

