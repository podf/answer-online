const ArticleModel = require('../model');

const GetItem = async (ctx, next) => {
    const { _id } = ctx.params;

    const failed = (code, message) => {
        ctx.body = {
            code: code,
            success: false,
            message: message,
        }
    }

    try {
        const article = await ArticleModel.findOne({ _id }).exec();
        ctx.response.body = {
            code: 0,
            article,
            message: 'success',
        }
    } catch (error) {
        console.log(error, 'error ');
        failed(1, error);
        return;
    }
}

module.exports = GetItem;
