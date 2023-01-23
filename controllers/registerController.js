const userModel = require('../models/userModel.js');

module.exports = {
register: function (req, res) {
const nama_lengkap = req.body.nama_lengkap;
const tanggal_lahir = req.body.tanggal_lahir;
const email = req.body.email;
const password = req.body.password;
const konfirmasi_password = req.body.konfirmasi_password;
if (password !== konfirmasi_password) {
res.status(400).send({ message: "Konfirmasi password tidak sesuai" });
} else {
userModel.addUser({nama_lengkap, tanggal_lahir, email, password}, function (err, result) {
if (err) {
console.log(err);
res.status(500).send({ message: "Gagal mendaftar" });
} else {
res.status(200).redirect('/home');
}
});
}
}
};