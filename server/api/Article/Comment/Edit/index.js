const ArticleModel = require('../../model');
const UserMondel = require('../../../Auth/model');
const CommentModel = require('../../model/comment');

const Comment = async (ctx, next) => {
    const {
        body: {
            _id,
            author,
            avatar,
            to,
            content,
            parentId,
        }
    } = ctx.request;

    const failed = (code, message) => {
        ctx.body = {
            code: code,
            success: false,
            message: message,
        }
    }

    try {
        const obj = {
            title: _id,
            author,
            to,
            avatar,
            content,
            parentId,
        }
        const comments = new CommentModel(obj);
        await comments.save();
        const user = await UserMondel.findOne({ username: author });
        await UserMondel.updateOne({ username: author }, { $set: { star: user.star + 3 } })
        ctx.response.body = {
            code: 0,
            comments,
            message: 'success',
        }
    } catch (error) {
        console.log(error, 'error ');
        failed(1, error);
        return;
    }
}

module.exports = Comment;
