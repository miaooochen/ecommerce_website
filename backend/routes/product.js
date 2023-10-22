const router = require('express').Router();
const Product = require('../models/Product');
const CryptoJS = require('crypto-js');
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');

// create product
router.post('/', verifyTokenAndAdmin, async (req, res)=> {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});
//update
router.put('/:id', verifyTokenAndAdmin, async(req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id, {
                $set : req.body,
            }, {new: true});
            res.status(200).json(updatedProduct);
    } catch(err){
        res.status(500).json(err);
    }
});
//delete
router.delete('/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json('Product has been deleted.');
    } catch(err){
        res.status(500).json(err);
    }
});
//get product by id
router.get('/find/:id', async (req, res) => {
    try {
        //const targetProduct = await Product.findById(req.params.id); //id = mongoDB自動新增的欄位_id
        const targetProduct = await Product.find({"productID" : req.params.id});
        res.status(200).json(targetProduct);
    } catch(err){
        res.status(500).json(err);
    }
});
//get all products or get products by category
router.get('/', async (req, res) => {
    const queryNew = req.query.New;
    const queryCategory = req.query.category;
    
    try {
        const allProducts = queryNew ? 
            await Product.find().sort({createdAt : -1}).limit(10) : queryCategory ? 
            await Product.find({categories : {$in : queryCategory}}) :
            await Product.find();
        res.status(200).json(allProducts);
    } catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;