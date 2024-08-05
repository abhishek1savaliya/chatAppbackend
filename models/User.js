const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
    },
    status: {
        type: Boolean,
        default: true
    },
    image: {
        type: String,
        default: null
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('User', UserSchema);
