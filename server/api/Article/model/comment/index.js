const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    title: { type: String, required: true },
    avatar: { type: String, required: true },
    author: { type: String, required: true },
    to: { type: String, required: false },
    content: { type: String, required: true },
    child: { type: Array, default: [] },
    createAt: { type: Date, default: new Date() },
    parentId: { type: String, },
});

const CommentModel = mongoose.model('comments', CommentSchema);

module.exports = CommentModel;
