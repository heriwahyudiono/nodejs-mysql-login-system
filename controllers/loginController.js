const userModel = require('../models/userModel.js');

module.exports = {
login: function (req, res) {
const email = req.body.email;
const password = req.body.password;
userModel.checkUser(email, password, function (err, result) {
if (err) {
res.status(500).send({ message: "Error checking user" });
} else {
if (result.length > 0) {
req.session.user = result[0];
res.status(200).redirect('/home');
} else {
res.send("Email atau password salah");
}
}
});
}
};