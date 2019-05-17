const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema =  new Schema ({
    facebook:{
        type: String
    },
    google:{
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    image:{
        type: String
    },
    country:{
        type: String
    },
    online:{
        type: Boolean,
        default: false
    },
    wallet:{
        type: Number,
        default: 0

    },
    date: {
        type: Date,
        default: Date.now
    }

})
module.exports = mongoose.model('Users', userSchema)