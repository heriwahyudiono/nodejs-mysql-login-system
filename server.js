const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const path = require('path');

const loginController = require('./controllers/loginController.js');
const registerController = require('./controllers/registerController.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// add session
const session = require('express-session');
app.use(session({
secret: 'secret',
resave: true,
saveUninitialized: true
}));

app.get('/', function (req, res) {
res.redirect('/login');
});

app.get('/login', function (req, res) {
res.render('login');
});

app.post('/login', loginController.login);

app.get('/register', function (req, res) {
res.render('register');
});

app.post('/register', registerController.register);

app.get('/home', function (req, res) {
if (req.session.user) {
res.render('home', { user: req.session.user });
} else {
res.redirect('/login');
}
});

app.get('/logout', function (req, res) {
req.session.destroy();
res.redirect('/login');
});

app.listen(3000, function () {
console.log('Server is running on port 3000');
});