const { convertToModel}  = require('../Socket/CRUDsocket');
const collections = { NSFW, Work, Study, UserList } = require('../../model/user')
class HomeController {
    //GET: /home
    chatRoom(req, res) {
        res.render('home', {user: req.body, style: 'home.css'})
    }
    //GET: /stored/message/:room
    renderMessage(req, res){
        const model = convertToModel(req.params.slug, collections)
        model.find({}).then(message =>{
         res.json(message)
        })
       
    }
    //GET: /stored/user/:room
    renderUser(req, res){
        UserList.find({ room: req.params.slug }).then(user => {
            res.json(user)
        })
            
    }
    //GET: /home/delete/:room/:username
    deleteUser(req, res){
        UserList.deleteOne({room: req.params.room, username: req.params.username})
        .then(()=>res.send('Deleted'))
    }
    
}
module.exports = new HomeController();