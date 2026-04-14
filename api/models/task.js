const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const Task = new Schema({
    title: {
        type    : String,
        trim    : true,
        required: [true, 'Le titre est obligatoire']
    },
    status: {
        type    : String,
        enum    : ['todo', 'in_progress', 'done'],
        default : 'todo',
        required: [true, 'Le statut est obligatoire']
    },
    order: {
        type    : Number,
        required: [true, 'L\'ordre est obligatoire']
    }
});

module.exports = mongoose.model('Task', Task);
