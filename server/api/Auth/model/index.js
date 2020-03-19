const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    _id: { type: String },
    name: { type: String },
    // unique用户名不允许重复
    username: { type: String, unique: true },
    password: {
        type: String, set(value) {
            const bcrypt = require('bcrypt');
            return bcrypt.hashSync(value, 10);
        }
    },
    identity: { type: String },
    phone: { type: String },
    email: { type: String },
    createAt: { type: Date },
});


const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;



