const { messages } = require("../utility/messages");

const setUserRolePermission = (role , req) => {

    if (!role) {
      return res.status(400).json({
        status: "bad request",
        requestAt: req.requestTime,
        message: messages.roletype_not_found
      });
    }

    if(role == 'admin')
    {
        if(  
            req.originalUrl.indexOf(`/api/v1/SignIn`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/SignUp`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/GetCurrentProfile`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/UpdateProfile`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/getAllUserList`)> -1 ||

            req.originalUrl.indexOf(`/api/v1/createOrder`)> -1  ||
            req.originalUrl.indexOf(`/api/v1/getOrderByID`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/cancelOrderByID`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/update_order_statusByID`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/getAllOrderList`)> -1 ||
        
            req.originalUrl.indexOf(`/api/v1/addProduct`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/getProductByID`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/updateProductByID`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/deleteProductByID`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/setProductAvailabilityByID`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/getAllProductList`)> -1 
          )
          {   req.app.locals.permission_flag = true;
              req.app.locals.permission_message = `${role} role has permission to use this ${req.originalUrl} functionality.` }
          else{
              req.app.locals.permission_flag = false;
              req.app.locals.permission_message = `${role} role has no permission to use this ${req.originalUrl} functionality.`
          }

    }
    else if(role == 'seller')
    {
        if(
            req.originalUrl.indexOf(`/api/v1/SignIn`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/SignUp`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/GetCurrentProfile`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/UpdateProfile`)> -1 ||

            req.originalUrl.indexOf(`/api/v1/addProduct`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/getProductByID`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/updateProductByID`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/deleteProductByID`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/setProductAvailabilityByID`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/getAllProductList`)> -1 ||
            
            req.originalUrl.indexOf(`/api/v1/getAllOrderList`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/getOrderByID`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/update_order_statusByID`)> -1 
          )
          {   req.app.locals.permission_flag = true;
              req.app.locals.permission_message = `${role} role has permission to use this ${req.originalUrl} functionality.` }
          else{
              req.app.locals.permission_flag = false;
              req.app.locals.permission_message = `${role} role has no permission to use this ${req.originalUrl} functionality.`
          }
        
    }
    else{
        if( 
            req.originalUrl.indexOf(`/api/v1/SignIn`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/SignUp`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/GetCurrentProfile`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/UpdateProfile`)> -1 ||

            req.originalUrl.indexOf(`/api/v1/createOrder`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/getOrderByID`)> -1 ||
            req.originalUrl.indexOf(`/api/v1/cancelOrderByID`)> -1 
        )
        {   req.app.locals.permission_flag = true;
            req.app.locals.permission_message = `${role} role has permission to use this ${req.originalUrl} functionality.` }
        else{
            req.app.locals.permission_flag = false;
            req.app.locals.permission_message = `${role} role has no permission to use this ${req.originalUrl} functionality.`
        }
        
    }

}

const checkUserPermission = (req,res,next) => {
  
  if(!req.app.locals.permission_flag)
  {
    return res.status(401).json({
      status: "unauthorized ",
      requestAt: req.requestTime,
      errorCode: 401,
      message: req.app.locals.permission_message,
    });
  }
  next();
}

module.exports = {setUserRolePermission , checkUserPermission};