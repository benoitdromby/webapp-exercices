const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Position = new Schema({
    symbol: {
        type    : String,
        trim    : true,
        required: [true, 'Le symbole est obligatoire'],
        uppercase: true
    },
    quantity: {
        type    : Number,
        required: [true, 'La quantité est obligatoire']
    },
    price: {
        type    : Number,
        required: [true, 'Le prix d\'achat est obligatoire']
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Position', Position);
