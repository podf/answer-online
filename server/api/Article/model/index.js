const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const articleSchema = new Schema({
    // _id: String,
    userId: { type: String },
    title: { type: String },
    describe: { type: String },
    createAt: { type: Date, default: new Date() },
    star: { type: Number, default: 0 },
    comments: {
        type: Array,
        default: [],
    }
});


const UserModel = mongoose.model('article', articleSchema);

module.exports = UserModel;
