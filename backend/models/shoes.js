const mongoose = require('mongoose');
const Schema = mongoose.Schema

const ShoesSchema = new Schema({
    imageUrl: String,
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
})

const Shoes = mongoose.model('shoes', ShoesSchema);
module.exports = Shoes;