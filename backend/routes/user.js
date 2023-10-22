const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('./verifyToken');
//update
router.put('/:id', verifyTokenAndAuthorization, async(req, res) => {
    try {
        //if update password, encrypt it.
        if(req.body.password){
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString();
        }
        const updatedUser = await User.findByIdAndUpdate(
            req.user.id, {
                $set : req.body,
            }, {new: true});
            res.status(200).json(updatedUser);
    } catch(err){
        res.status(500).json(err);
    }
});
//delete
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json('user has been deleted.');
    } catch(err){
        res.status(500).json(err);
    }
});
//get user
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const targetUser = await User.findById(req.params.id);
        const {password, ...others} = targetUser._doc;
        res.status(200).json(others);
    } catch(err){
        res.status(500).json(err);
    }
});
//get all users
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.isQuery
    try {
        const allUsers = query ? await User.find().sort({_id : -1}).limit(2) : await User.find();
        res.status(200).json(allUsers);
    } catch(err){
        res.status(500).json(err);
    }
});
//get yearly added users status
router.get('/status', verifyTokenAndAdmin, async (req, res)=> {
    const date = new Date();
    //const thisyear = new Date(date.setFullYear(date.getFullYear()));
    const lastYearSameDate = new Date(date.setFullYear(date.getFullYear()-1));
    try {
        const data = await User.aggregate([
            {$match : {createdAt : {$gt : lastYearSameDate}}},
            {$project : {
                month : {$month : "$createdAt"}//新增month欄位 用$month方法取欄位createdAt月份
            }},
            {$group : {
                _id : "$month",//新增id欄位 值為上面新建的month欄位
                total : {$sum : 1}
            }}
        ]);
        res.status(200).json(data);
    } catch(err){
        res.status(500).json(err);
    }
})
module.exports = router;