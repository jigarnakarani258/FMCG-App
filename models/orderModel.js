const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    orderedByUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    order_price: {
        type: Number,
        required: [true, 'Please tell us your order_price!'],
    },
    order_address: {
        type: String,
        required: [true, 'Please tell us your order_address!']
    },
    order_status:{
        type: String,
        enum: {
          values: ['Deliverd', 'UserCancelled', 'NotShipped', 'Shipped'],
          message: `order_status is only one of this value:- 'Deliverd' ,'UserCancelled', 'NotShipped', 'Shipped'`
        },
        default: 'NotShipped'  //when user cancel the order then update this order_status = UserCancelled;
    }
},
    { timestamps: true }
)

const Orders = mongoose.model("Order", OrderSchema);

module.exports = { Orders };
