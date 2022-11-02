const mongoose =require('mongoose')

const movieSchema=new mongoose.Schema({
    movieName:String,
    type:String,
    rating:Number,
    date:String,
    standard:[{
        _id:Number,
        booked:Boolean
    }],
    premium:[{
        _id:Number,
        booked:Boolean
    }]
})

module.exports= mongoose.model('Movie',movieSchema)