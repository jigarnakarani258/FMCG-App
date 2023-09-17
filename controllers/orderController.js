const { Orders } = require('../models/orderModel')
const { messages } = require('../utility/messages');
const { AppError } = require('../utility/appError');
const { Products } = require('../models/productModel');

//create Order API, Authenticated with Passport JS
const createOrder = async (req, res, next) => {

  try {
    const {product_id, order_price, order_address } = req.body;

    //product_buyer id get from token
    let product_buyer = req.user._id

    let order = new Orders({
      product_id: product_id,
      order_price: order_price,
      order_address: order_address,
      orderedByUser: product_buyer
    });

    //check this logic one more time-and operator use in query otherwise
    const ProductIsAvailableForOrder = await Products.findById({ _id: product_id },{__v:0});
    if (!ProductIsAvailableForOrder.is_available) {
      return res.status(400).json({
        status: "fail",
        requestAt: req.requestTime,
        message: messages.product_is_not_Available_for_order
      });
    }

    order
      .save()
      .then(() => {
        return res.status(201).json({
          status: "success",
          requestAt: req.requestTime,
          data: {
            neworder: {
              id: order._id,
              order_price:   order.order_price,
              order_address: order.order_address,
              orderedByUser: order.product_buyer,
              product_id:    order.product_id,
              product : ProductIsAvailableForOrder
            },
          },
          message: messages.order_created_successfully
        });
      })
      .catch(err => {
        return next(new AppError(err, 401));
      });
  } catch (err) {
    return next(new AppError(err, 401));
  }

};

//getOrderByID API , Authenticated with Passport JS
const getOrderByID = async (req, res, next) => {

  try {
    //user id get from token
    const user_id = req.user._id

    let order_id = req.params.order_id
    let getOrder = await Orders.findById(order_id)

    if (getOrder === undefined || getOrder === "" || getOrder === null) {
      return res.status(401).json({
        status: "Bad Request",
        requestAt: req.requestTime,
        errorCode: 404,
        message: messages.order_not_found_with_provided_id
      });
    }
    else {
      return res.status(200).send({
        status: "success",
        requestAt: req.requestTime,
        orderInfo: getOrder,
        message: messages.fetch_order_info_successfully,
      });
    }
  } catch (err) {
    return next(new AppError(err, 400));
  }


};

//cancelOrderByID API , Authenticated with Passport JS
const cancelOrderByID = async (req, res, next) => {

  try {
    //user id get from token
    const user_id = req.user._id

    let order_id = req.params.order_id;

    let checkOrderStatus = await Orders.findById(order_id);
    if(checkOrderStatus.order_status == 'UserCancelled'){
      return res.status(200).send({
        status: "success",
        requestAt: req.requestTime,
        message: messages.order_already_cancelled
      });
    }

    let cancelOrder = await Orders.findByIdAndUpdate(order_id, {order_status:'UserCancelled'}, {
      new: true,
      runValidators: true,
    });

    if (cancelOrder === undefined || cancelOrder === "" || cancelOrder === null) {
      return res.status(401).json({
        status: "Bad Request",
        requestAt: req.requestTime,
        errorCode: 404,
        message: messages.order_not_found_with_provided_id
      });
    }
    else {
      return res.status(200).send({
        status: "success",
        requestAt: req.requestTime,
        cancelOrder: cancelOrder,
        message: messages.order_cancel_successfully,
      });
    }
  } catch (err) {
    return next(new AppError(err, 400));
  }

};

//change logic - add pagination
//getAllOrderList API , Authenticated with Passport JS
const getAllOrderList = async (req, res, next) => {

  try {
    let orderList = await Orders.find({}, { __v: 0 })
    return res.status(200).send({
      status: "success",
      requestAt: req.requestTime,
      NoResults: orderList.length,
      data: {
        Orders: orderList,
      },
    });
  } catch (err) {
    return next(new AppError(err, 400));
  }
 
};

//updateOrderStatusByID API , Authenticated with Passport JS
const updateOrderStatusByID = async (req, res, next) => {

  try {
    //acess by admin-seller
    const id = req.user._id

    let order_id = req.params.order_id
    const { order_status } = req.body;
   
    let updatedOrderStatus = await Orders.findByIdAndUpdate(order_id, {order_status:order_status}, {
      new: true,
      runValidators: true,
    });
    if (updatedOrderStatus === undefined || updatedOrderStatus === "" || updatedOrderStatus === null) {
      return res.status(401).json({
        status: "Bad Request",
        requestAt: req.requestTime,
        errorCode: 404,
        message: messages.order_not_found_with_provided_id
      });
    }
    else {
     
      return res.status(200).json({
        status: "Success",
        requestAt: req.requestTime,
        updatedOrderStatus: updatedOrderStatus,
        message: messages.order_updated_successfully,
      });
    }
  }
  catch (err) {
    return next(new AppError(err, 401));
  }

};


module.exports = {
  createOrder,
  getOrderByID,
  updateOrderStatusByID,
  cancelOrderByID,
  getAllOrderList
}

