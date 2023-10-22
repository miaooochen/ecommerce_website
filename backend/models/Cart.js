const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    userID : {type : String, required: true},
    products: [
        {
            productID: {type: String, required: true},
            amount: {type: Number, default: 1},
        }
    ]
}, {timestamps: true});

module.exports = mongoose.model('Cart', CartSchema);