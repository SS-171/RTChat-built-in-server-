
function jsonUser(password, room, username) {

    return {
        room: room,
        username: username,
        password: password,
    }
}
module.exports = {
     jsonUser
}