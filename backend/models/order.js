const mongoose = require('mongoose');
const User = require('./user')
const OrderSchema = new mongoose.Schema({
    order_id : {
        type : String,
    },
    customer_id : {
        type : mongoose.Types.ObjectId,
        ref : User ,
        required : [true , `owner id can't be empty`]
    },
    items : [
        {
            id : {
                type : Number , 
                required : [true , `id can't be empty`]
            },
            qty : {
                type : Number , 
                default : 1,
                min : [1 , `qty is too low`]
            },
            title : {
                type : String,
                required : [true , `title can't be empty`]

            },
            price : {
                type : Number,
                required : [true , `price can't be empty`]

            },
            image : {
                type : String,
            }
        }
    ],
    amount : {
        type : Number ,
        required : [true , `amount can't be empty`]
    },
    paymentStatus : {
        type : Boolean,
        default : false,
    },
    isRefunded : {
        type : Boolean,
        default : false,
    }

})

module.exports = mongoose.model('Order' , OrderSchema)