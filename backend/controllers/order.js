const placeOrder = async(req,res,next) => {
    try {
        res.send('placing')
    } catch (error) {
        
    }
}
const cancelOrder = async(req,res,next) => {
    try {
        res.send('deleting')
        
    } catch (error) {
        
    }
}

module.exports = {placeOrder , cancelOrder}