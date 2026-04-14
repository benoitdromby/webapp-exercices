const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Order = new Schema({
    price: {
        type    : Number,
        required: [true, 'Le prix est obligatoire']
    },
    size: {
        type    : Number,
        required: [true, 'La taille est obligatoire']
    },
    side: {
        type    : String,
        enum    : ['bid', 'ask'],
        required: [true, 'Le côté est obligatoire']
    }
});

module.exports = mongoose.model('Order', Order);
