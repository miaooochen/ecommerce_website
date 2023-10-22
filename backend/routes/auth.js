const router = require('express').Router();
const User = require('../models/User')
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');

//register
router.post('/register', async (req, res)=> {
    try{
        const sameUser = await User.findOne({username : req.body.username});
        sameUser && res.status(401).json('This username has already existed, please rename username.');
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SECRET).toString()
        });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch(err){
        res.status(500).json(err);
    }
});
//login
router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne({username : req.body.username});
        !user && res.status(401).json('could not find user.');

        const oriPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SECRET).toString(CryptoJS.enc.Utf8);
        oriPassword !== req.body.password && res.status(401).json('password does not match');
        
        const {password, ...others} = user._doc;
        //token
        const accesstoken = jwt.sign({
            id : user._id,
            isAdmin: user.isAdmin,
        }, 
        process.env.JWT_SECRET, 
        {expiresIn:'1d'}
        );

        res.status(200).json({...others,accesstoken});
    } catch(err){
        res.status(500).json(err);
    }

});
module.exports = router; 