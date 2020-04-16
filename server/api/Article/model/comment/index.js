const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    title: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: false },
    content: { type: String, required: true },
    parentId: { type: String, },
    child: { type: Array, default: [] },
    createAt: { type: Date, default: new Date() },
});

const CommentModel = mongoose.model('comments', CommentSchema);

module.exports = CommentModel;
