const mongoose = require('mongoose');
async function connect() {
    try {
        await mongoose.connect('mongodb+srv://thanhnhon:nhon171@cluster0.rmp3v.mongodb.net/chatApp?retryWrites=true&w=majority');
        console.log('Connected successfully!')
    } catch (error) {
        console.log('Connect failure!');
    }
}
module.exports = { connect };