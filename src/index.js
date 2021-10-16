//express used for handle request and response conveniently
const express= require('express');
const app = express();
const exphbs = require('express-handlebars');//view engine used for render user interface
const morgan = require('morgan')//logger
const route = require('./routes');
const db = require('./config/db');
const path = require('path');
const socketio =require('socket.io');
let formatMessage = require('./utils/formatMessage');
let {  jsonUser} = require('./utils/formatUser');
let { addUser, getCurrentUser, getRoomUsers, userLeave, 
    checkSameUser, deleteSameUser, saveSameUser, 
    getSameUserArr, getNameInSameUser, getIdOfSameUserArr, checkIfHasSame} = require('./utils/users');
let { saveMessage, saveUser, deleteMessage} = require('./app/controllers/Socket/CRUDsocket')
//connect to db
db.connect();
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));
app.engine('.hbs', exphbs(
    {
        extname: '.hbs'
    }
));
app.use(express.json())
app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'resources/views' ))
app.use(
    express.urlencoded({
        extended: true,
    }),
);
route(app)
const server = app.listen(process.env.PORT || 3000);
const io = socketio(server);
io.on('connection', (socket) =>{
    const botName = 'Admin';
    let isAvailable = false;
    let myId;
    socket.on('userJoin', ({username, room, password, isNew}) =>{
        //check if username exist
        isAvailable = checkSameUser(username, room);
            // welcome message
        socket.emit('welcome', formatMessage(botName, `Welcome to ${room}`));
        // add user to array
        let user= addUser(socket.id, username, room);
        socket.join(user.room);
        myId = socket.id;
        //notify when user joined room
        io.to(user.room).emit('notify', user.room)
        //
        if(isAvailable) socket.broadcast.to(user.room).emit('userStatus',formatMessage(botName, `${username} has just joined the chat`));
        else {
            myId = user.id;
            saveSameUser(room, username, socket.id);
            console.log('add',getSameUserArr())
        }
        io.to(user.room).emit('roomUsers', {
            roomName: user.room,
            roomUsers: getRoomUsers(user.room),

        });
        socket.emit('meIndicate', username)
        ///save user to database
        if (isNew ==='true') {
            saveUser(jsonUser(password,room, username ));
        };
        
    });



    //listen for indicate request 
    socket.on('indicate', (id)=>{
        let username;
        if(!isAvailable) {
            username = getNameInSameUser(id)
        }
        else username = getCurrentUser(id).username;
        socket.emit('yourIndicate', username )
    })
    //listen for chat messages
    socket.on('newMessage', data => {
        let userID =[];
        //save message to database
        saveMessage(formatMessage(data.username, data.message), data.room);
        userID = getIdOfSameUserArr(data.room, data.username);
        io.to(data.room).emit('commonMessage', formatMessage(data.username, data.message), userID);
    });
    //listen for typing messages
    socket.on('userTyping', user => {
        socket.broadcast.to(user.room).emit('typingEvent',user.username);

    });
    socket.on('disconnect',()=>{
        const user = userLeave(socket.id);
        console.log('delete', getSameUserArr());
        if(user) 
        {   
            if(!checkIfHasSame(user.username, user.room))
            { 
                socket.broadcast.to(user.room).emit('userStatus', formatMessage(botName, `${user.username} has just left the chat`));
                io.to(user.room).emit('roomUsers', {
                    roomName: user.room,
                    roomUsers: getRoomUsers(user.room)
                })
            }
            
        }
        else deleteSameUser(socket.id);
    })

    


})
//socket.broadcast.emit('') send message to all client except the one conecting
//io.emit() : send message to all client
//socket.emit : send to just the current connecting client