const ArticleModel = require('../model');
const CommentModel = require('../model/comment');

const Comment = async (ctx, next) => {
    const { _id } = ctx.params;

    const failed = (code, message) => {
        ctx.body = {
            code: code,
            success: false,
            message: message,
        }
    }

    try {
        const comments = await CommentModel.find({ title: _id }).exec();
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
