const mongoose = require('mongoose');

const Schema = new mongoose.Schema;

const message = new Schema({
    fullname: {
        type: String
    },
    email: {
        type: String
    },
    message: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }

})
mongoose.exports()