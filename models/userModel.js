const connection = require('../config/connection.js');
const md5 = require('md5');

module.exports = {
getUsers: function (callback) {
const sql = 'SELECT * FROM users';
connection.query(sql, function (err, result) {
if (err) {
console.log(err);
callback(err, null);
} else {
callback(null, result);
}
});
},
addUser: function (user, callback) {
const sql = "INSERT INTO users (nama_lengkap, tanggal_lahir, email, password) VALUES (?,?,?,?)";
const password = md5(user.password);
connection.query(sql, [user.nama_lengkap, user.tanggal_lahir, user.email, password], function (err, result) {
if (err) {
console.log(err);
callback(err, null);
} else {
callback(null, result);
}
});
},
checkUser: function (email, password, callback) {
const sql = "SELECT * FROM users WHERE email = ? AND password = ?";
const pass = md5(password);
connection.query(sql, [email, pass], function (err, result) {
if (err) {
console.log(err);
callback(err, null);
} else {
callback(null, result);
}
});
}
};