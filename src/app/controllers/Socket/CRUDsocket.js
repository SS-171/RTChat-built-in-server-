const collections ={NSFW, Work, Study, UserList} = require('../../model/user')
const { mongooseToObject, multipleMongooseToObject } = require('./mongooseHandle');
function convertToModel(room, collections) {
    
    let temp;
    Object.keys(collections).forEach(collection =>{
        if (collection === room) {
            temp =collections[collection]
        }
    });
    return temp;
}

function saveMessage(data, room) {
    const model = convertToModel(room, collections);
    const user = new model(data);
    user.save(function(err, result){
        
    })
}

function saveUser(data){
    const user = new UserList(data);
    user.save(function (err, result) {
        if(err) console.log(err);
    });
}
function deleteMessage(msgID, room){
    const model = convertToModel(room, collections);
    model.deleteOne({_id: msgID})
}

module.exports = {
    saveMessage, saveUser, deleteMessage, convertToModel
}