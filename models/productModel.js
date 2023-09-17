const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    product_name: {
        type: String,
        required: [true, 'Please tell us your product_name!']
    },
    product_brand: {
        type: String,
        required: [true, 'Please tell us your product_brand!']
    },
    product_price: {
        type: Number,
        required: [true, 'Please tell us your product_price!'],
    },
    product_category: {
        type: String,
        required: [true, 'Please tell us your product_category!']
    },
    is_available: {
        type: Boolean,
        default: 'true'  //when stock was complete then update this is_available = false;
    },
    product_seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    { timestamps: true }
)

const Products = mongoose.model("Product", ProductSchema);

module.exports = { Products };
