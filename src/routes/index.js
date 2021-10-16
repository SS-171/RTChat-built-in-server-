/// URL request
const loginRouter = require('./login');
const homeRouter = require('./home');
const storedRouter = require('./storedData');

function route(app){
    app.use('/login' ,loginRouter);
    app.use('/home', homeRouter);
    app.use('/stored',storedRouter );
}
module.exports = route;