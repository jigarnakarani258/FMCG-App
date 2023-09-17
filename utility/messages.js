
let messages = {}

// Authentication Middleware 
messages.roletype_not_found = "User role type not found"

// user module
messages.email_already_exist = "This email already exists.!!"
messages.user_registered_successfully = "Customer has been registered successfully"
messages.provide_email = "Please provide email."
messages.provide_password = "Please provide password."
messages.invalid_email = "Invalid User, Please enter valid user email!"
messages.invalid_password = "Invalid password , Please enter valid user password!"
messages.user_login_successfully = "User SignIn successfully!!"
messages.user_not_found_with_provided_id = "No user found with that id!"
messages.user_get_successfully = "Get current user profile successfully!!"
messages.user_not_found_with_provided_id = "No user found with that id!"
messages.user_update_successfully = "User profile updated successfully!!"
messages.user_is_not_active= "User is not Active."

// product module
messages.product_already_addded_by_seller= "This Product is already added by this product_seller successfully"
messages.product_added_successfully = "Product has been added successfully"
messages.product_updated_successfully = "Product has been updated successfully"
messages.product_deleted_successfully = "Product has been deleted successfully"
messages.product_is_now_not_available = "Product is not-availble now due to out of stock "
messages.product_is_now_available = "Product is availble now ."
messages.product_not_found_with_provided_id = "Product is not found with provided product_id "

//order module
messages.product_is_not_Available_for_order = "Product is not-availble now due to out of stock "
messages.order_created_successfully = "Order has been placed successfully"
messages.order_updated_successfully = "Order has been updated successfully"
messages.order_cancel_successfully = "Order has been cancel successfully"
messages.order_already_cancelled = "Order has been already cancelled eariler."
messages.order_not_found_with_provided_id = "Order is not found with provided order_id "
messages.fetch_order_info_successfully = "Fetch order info successfully"

module.exports.messages = messages