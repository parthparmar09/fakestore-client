const router = require('express').Router();
const {placeOrder , cancelOrder} = require('../controllers/order')

router.route('/').post(placeOrder).delete(cancelOrder)



module.exports =  router