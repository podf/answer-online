// import mongoose from 'mongoose';
const UserModel = require('../Auth/model');
const ArticleModel = require('./model/article');

const Article = async (ctx, next) => {
    const {
        body: { userId, title, describe }
    } = ctx.request;

    const failed = (code, message) => {
        ctx.body = {
            code: code,
            success: false,
            message: message,
        }
    }

    try {
        await ArticleModel.insertMany({
            userId,
            title,
            describe,
        });
    } catch (error) {
        console.log(error, 'error ');
        failed(1, error);
        return;
    }

    ctx.response.body = {
        code: 0,
        message: 'success',
    }
}

module.exports = Article;
