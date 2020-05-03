const ArticleModel = require('../model');

const DeleteItem = async (ctx, next) => {
    const { _id } = ctx.params;

    const failed = (code, message) => {
        ctx.body = {
            code: code,
            success: false,
            message: message,
        }
    }

    try {
        await ArticleModel.deleteOne({ _id });
        ctx.response.body = {
            code: 0,
            message: 'success',
        }
    } catch (error) {
        console.log(error, 'error ');
        failed(1, error);
        return;
    }
}

module.exports = DeleteItem;
