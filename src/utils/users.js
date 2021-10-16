const users = [];
let sameUsers =[]
function addUser(id, username, room){
    let user = { id, username, room };
    if (checkSameUser(username, room)) users.push(user);
    else {user =users.find(user=>(username === user.username)&&(room ===user.room))}
    return user;
}
function getCurrentUser (id) {
    return users.find(user => id ===user.id)
}
function getRoomUsers(room) {
    return users.filter(user => user.room === room);
}
function userLeave(id){
    const index = users.findIndex(user => user.id === id);
    if(index !== -1) {
        return users.splice(index, 1)[0];
    }
}
function checkIfHasSame(username, room){
    let result=false;
    sameUsers.every(arr =>{
        if(arr[0] ===room && arr[1] ===username)
        {
            result = true;
            return false;
        }
        return true;
    })
    return result;
    
}

function checkSameUser(username, room){
    let valid = true;
    users.every(each =>{
        if(each.username ===username && each.room ===room) 
        {
            valid=false;
            return false;
        }
        return true;
    })
    return valid;
}
function saveSameUser(room, username, id){
    let usrIndex;
    sameUsers.forEach((each, index) =>{
        if((each[0] ===room) &&(each[1] ===username)){
            usrIndex = index;
            return;
        }
    })
    if(usrIndex === undefined) sameUsers.push([room, username, id])
    else {
        sameUsers[usrIndex].push(id);

        console.log('pushed ID')
    }

}
function deleteSameUser(id){
    let arrIndex;
    sameUsers.forEach((arr,index) =>{
        let childIndex = arr.indexOf(id);
        if(childIndex !== -1){
            arr.splice(childIndex, 1);
            if (arr.length === 2) arrIndex = index;
            return;
        }
    });
    if(arrIndex !== undefined) {
        sameUsers.splice(arrIndex, 1);
    }
 
}
function getSameUserArr(){
    return sameUsers;
}
function getNameInSameUser(id){
    let username;
    sameUsers.forEach((arr) =>{
        if (arr.includes(id)) username = arr[1];
    })
    return username;
}
function getIdOfSameUserArr(room, username){
    let idArr = new Array();
    sameUsers.every((each, index) => {
        if ((each[0] === room) && (each[1] === username)) {
            idArr.push(diffArray(each, [each[0], each[1]]));
            return false;
        }
        return true;
    })
    users.every((each)=>{
        if(each.room === room && each.username ===username)
        {
            idArr.push(each.id)
            return false;
        }
        return true;
    })
    return (idArr);
    
}
function diffArray(arr1, arr2) {
    return arr1.concat(arr2).filter(item => !arr1.includes(item) || !arr2.includes(item))
}
module.exports = {
    addUser,
    getCurrentUser,
    getRoomUsers,
    userLeave,
    checkSameUser,
    deleteSameUser,
    saveSameUser,
    getSameUserArr,
    getNameInSameUser,
    getIdOfSameUserArr,
    checkIfHasSame
}