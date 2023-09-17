const { Orders } = require('../models/orderModel')
const { messages } = require('../utility/messages');
const { AppError } = require('../utility/appError');
const { Products } = require('../models/productModel');

//create Order API, Authenticated with Passport JS
const createOrder = async (req, res, next) => {

  try {
    const {product_id, order_price, order_address } = req.body;

    if(  product_id == "string" || order_address == "string" || order_price <= 0 ){
      return res.status(400).json({
        status: "Bad Request",
        requestAt: req.requestTime,
        errorCode: 400,
        message: messages.enter_valid_value_of_order
      });
    }
    //product_buyer id get from token
    let product_buyer = req.user._id

    let order = new Orders({
      product_id: product_id,
      order_price: order_price,
      order_address: order_address,
      orderedByUser: product_buyer
    });

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
    return next(new AppError(err, 400));
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
      return res.status(404).json({
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
      return res.status(404).json({
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


//getAllOrderList API , Authenticated with Passport JS
const getAllOrderList = async (req, res, next) => {
  try {
    const { product_id, user_id, order_price_range, order_price, date } = req.query;
    const page =  req.query.page || 1 ;
    const limit =  req.query.limit || 10 ;

    if(page <= 0 || limit <=0){
      return res.status(400).json({
        status: "Bad Request",
        requestAt: req.requestTime,
        errorCode: 400,
        message: messages.enter_valid_value_for_pagination
      });
    }

    // create the filter criteria based on query request parameters
    const filter = {};
    if (product_id) {
      filter.product_id = product_id;
    }
    if (user_id) {
      filter.orderedByUser = user_id;
    }
    if (order_price_range) {
      const [minPrice, maxPrice] = order_price_range.split('-');  //sample order_price_range = 100-2000
      filter.order_price = { $gte: minPrice, $lte: maxPrice };
    }
    if (order_price) {
      filter.order_price = order_price;
    }
    if (date) {                       
      const [startDate, endDate] = date.split(',');  //sample date is a range like "2023-01-01,2023-12-31"
      filter.createdAt = { $gte: startDate, $lte: endDate };
    }

    const skip = (page - 1) * limit;

    const orderList = await Orders.find(filter, { __v: 0 })
      .skip(skip)
      .limit(limit);

    const totalResults = await Orders.countDocuments(filter);

    return res.status(200).send({
      status: "success",
      requestAt: req.requestTime,
      NoResults: orderList.length,
      totalResults,
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
    //acesss by admin-seller
    const id = req.user._id

    let order_id = req.params.order_id
    const { order_status } = req.body;
   
    let updatedOrderStatus = await Orders.findByIdAndUpdate(order_id, {order_status:order_status}, {
      new: true,
      runValidators: true,
    });
    if (updatedOrderStatus === undefined || updatedOrderStatus === "" || updatedOrderStatus === null) {
      return res.status(404).json({
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
    return next(new AppError(err, 400));
  }

};


module.exports = {
  createOrder,
  getOrderByID,
  updateOrderStatusByID,
  cancelOrderByID,
  getAllOrderList
}

