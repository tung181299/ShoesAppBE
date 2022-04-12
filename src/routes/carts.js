const express = require('express')
const router = express.Router()
const cors = require('cors');
const app = express();

const CartsController = require('../controllers/carts')

app.use(cors({origin: '*', credentials: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/api/getProductsByUserId/:id', CartsController.getProductsByUserId)
router.post('/api/addProductToCart', CartsController.addProductToCart)
router.delete('/api/removeProductByUserId/:id', CartsController.removeProductByUserId)

module.exports = router