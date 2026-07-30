const mongoose = require("mongoose");



const productSchema = mongoose.Schema({

        name:{
            type:String,
            required:[true,"Please add a name"],
        },
        description:{
            type:String,
            required:[true,"Please add a description"],
        },
        price:{
            type:Number,
            required:[true,"Please add a price"],
            min: [1, "Price must be greater than 0"]
        },
        category:{
            type:String,
            required:[true,"Please add a category"],

        },
        stock:{
            type:Number,
            required:[true,"Please add a stock"],
            min: [0, "Stock must be greater than or equal to 0"]
        },
        imageUrl:{
            type:String,
            required:[true,"Please add an image"]
        },
        createdAt:{
            type:Date,
            default: Date.now
        },
        rating:{
            type:Number,
            default:0,
        },
        numReviews:{
            type:Number,
            default:0,

        },
});

module.exports=mongoose.model("Product",productSchema);