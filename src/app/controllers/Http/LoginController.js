class LoginController {
    login(req, res) {
        res.render('login' ,{style: 'login.css'})
    }
}
module.exports = new LoginController();