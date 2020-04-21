const ArticleModel = require('../../model');
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
        //    await ArticleModel.findByIdAndUpdate(_id, { comments: commentData });
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
