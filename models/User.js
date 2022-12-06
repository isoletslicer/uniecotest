const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Please add a First Name'],
    },
    lastName: {
        type: String,
        required: [true, 'Please add a Last Name'],
    },
    email: {
        type: String,
        required: [true, 'Please add an Email'],
        unique: true,
    },
    gender: {
        type: String,
        required: [true, 'Please add a gender'],
    },
    addr: {
        type: Array,
    }
})

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);