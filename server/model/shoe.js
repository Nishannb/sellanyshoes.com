// import mongoose from "mongoose";
const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const ShoesSchema = new Schema({
    name: String,
    price: Number,
    color: [ String ],
    category: [ String ],
    img: {
        img1: String,
        img2: String,
        img3: String
    }
})

module.exports = mongoose.model("Shoes", ShoesSchema);

// export default ShoesSchema;