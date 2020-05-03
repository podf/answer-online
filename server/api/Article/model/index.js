const mongoose = require('mongoose');

const Schema = mongoose.Schema;



const articleSchema = new Schema({
    userId: { type: String },
    username: { type: String },
    title: { type: String },
    describe: { type: String },
    star: { type: Number, default: 0 },
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });


const UserModel = mongoose.model('article', articleSchema);

module.exports = UserModel;
