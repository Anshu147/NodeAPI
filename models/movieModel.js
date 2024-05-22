const mongoose = require("mongoose")

const movieSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Please enter movie name"]
        },
        img:{
            type:String,
            required:[true,"Please enter url of movie"]
        },
        summary:{
            type:String,
        }
    },
    {
        timestamps:true
    }
)

const Movie = mongoose.model("Movie",movieSchema)
module.exports = Movie;