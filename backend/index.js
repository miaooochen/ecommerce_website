const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const productRoute = require('./routes/product');
const cartRoute = require('./routes/cart');
const orderRoute = require('./routes/order');
const striprRoute = require('./routes/stripe');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');

mongoose.connect(process.env.MONGODB_URL)
.then(() => {
    console.log('MongoDB connect success');
})
.catch((err)=>{
    console.error(err);
})

app.use(cors());
app.use(express.json());
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/product', productRoute);
app.use('/cart', cartRoute);
app.use('/order', orderRoute);
app.use('/checkout', striprRoute);

app.listen(process.env.PORT, () => {
    console.log('backend server is running');
})