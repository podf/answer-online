// import mongoose from 'mongoose';
const ArticleModel = require('../model');

const Get = async (ctx, next) => {
    const failed = (code, message) => {
        ctx.body = {
            code: code,
            success: false,
            message: message,
        }
    }

    try {
        const articleList = await ArticleModel.find({}).sort({ created: 'desc' });
        ctx.response.body = {
            code: 0,
            articleList,
            message: 'success',
        }
    } catch (error) {
        console.log(error, 'error ');
        failed(1, error);
        return;
    }
}

module.exports = Get;
