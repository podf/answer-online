const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: { type: String },
    // unique用户名不允许重复
    username: { type: String, unique: true },
    password: {
        type: String, set(value) {
            return bcrypt.hashSync(value, 10);
        }
    },
    identity: { type: String },
    phone: { type: String },
    email: { type: String },
    sign: { type: String, default: '' },
    info: { type: String, default: '' },
    star: { type: Number, default: 0 },
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });


const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;



