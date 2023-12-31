const router = require('express').Router();
const Cart = require('../models/Cart');
const CryptoJS = require('crypto-js');
const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');

// create cart
router.post('/', verifyToken, async (req, res)=> {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart);
    } catch (err) {
        res.status(500).json(err);
    }
});
//update
router.put('/:id', verifyTokenAndAuthorization, async(req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            req.params.id, {
                $set : req.body,
            }, {new: true});
            res.status(200).json(updatedCart);
    } catch(err){
        res.status(500).json(err);
    }
});
//delete
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json('Cart has been deleted.');
    } catch(err){
        res.status(500).json(err);
    }
});
//get user cart
router.get('/find/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        const targetCart = await Cart.findOne({userID : req.params.id});
        res.status(200).json(targetCart);
    } catch(err){
        res.status(500).json(err);
    }
});
//get all carts
router.get('/', verifyTokenAndAdmin, async (req, res)=> {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;