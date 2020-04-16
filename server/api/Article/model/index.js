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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'commentSchema'
        // type: {
        //     title: { type: String, required: true },
        //     from: { type: String, required: true },
        //     to: { type: String, required: false },
        //     content: { type: String, required: true },
        //     parentId: { type: String, required: true, default: '' },
        //     createAt: { type: Date, default: new Date() },
        // },
        // default: [],
    }
});


const UserModel = mongoose.model('article', articleSchema);

module.exports = UserModel;
