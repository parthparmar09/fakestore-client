const router =  require('express').Router()

const {startOrder , verifyOrder} = require('../controllers/payments')

router.route('/order').post(startOrder)
router.route('/verify').post(verifyOrder)


module.exports = router