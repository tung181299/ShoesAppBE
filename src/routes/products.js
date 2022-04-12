const express = require('express');
const router = express.Router();
const cors = require('cors');
const app = express();

const ProductsController = require('../controllers/products')

app.use(cors({origin: '*', credentials: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/api/getProducts', ProductsController.getProducts)
router.get('/api/getProductById/:id', ProductsController.getProductById)
router.post('/api/addProduct', ProductsController.addProduct)
router.patch('/api/editProduct/:id', ProductsController.editProduct)
router.delete('/api/removeProductById/:id', ProductsController.removeProductById)

module.exports = router