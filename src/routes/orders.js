const express = require('express')
const router = express.Router()
const cors = require('cors');
const app = express();

const OrderController = require('../controllers/orders')

app.use(cors({origin: '*', credentials: true}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/api/getOrders', OrderController.getOrders)
router.get('/api/getOrderById/:id', OrderController.getOrderById)
router.post('/api/addOrder', OrderController.addOrder)
router.patch('/api/editOrderStatus/:id', OrderController.editOrderStatus)
router.delete('/api/removeOrder/:id', OrderController.removeOrder)

module.exports = router