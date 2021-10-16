const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const MsgSchema = new Schema({
    username: {type: String},
    message: {type: String},
    time: {type :String}
    },
)
const UserSchema = new Schema({
    room: { type: String },
    username: { type: String },
    password: { type: String },

},
    
)
module.exports = {
    NSFW: mongoose.model('NSFW', MsgSchema),
    Work: mongoose.model('Work', MsgSchema),
    Study: mongoose.model('Study', MsgSchema),
    UserList: mongoose.model('User', UserSchema),
}