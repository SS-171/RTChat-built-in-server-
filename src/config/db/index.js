const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost/chatApp');
        console.log('Connected successfully!')
    } catch (error) {
        console.log('Connect failure!');
    }
}
module.exports = { connect };