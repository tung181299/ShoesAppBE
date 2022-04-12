require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors');
const mongoString = process.env.DATABASE_URL;
const ProductsRouter = require('./routes/products');
const AuthsRouter = require('./routes/auths');
const OrdersRouter = require('./routes/orders');
const CartsRouter = require('./routes/carts');

mongoose.connect(mongoString, {useNewUrlParser: true, useUnifiedTopology: true});
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());

app.listen(3000, () => {
    console.log(`Server Started at ${3000}`)
})

app.use(cors({origin: '*', credentials: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('', ProductsRouter);
app.use('', AuthsRouter);
app.use('', OrdersRouter);
app.use('', CartsRouter);