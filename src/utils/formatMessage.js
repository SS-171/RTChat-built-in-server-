
module.exports = function formatMessage(username, message) {
    const date = require('date-and-time');
    const now = new Date();
    let time = date.format(now, 'hh:mm');
    return {
        username: username ,
        message: message,
        time : time,
    }
}