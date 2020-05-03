// import mongoose from 'mongoose';
const UserModel = require('../../Auth/model');
const ArticleModel = require('../model');

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
        const user = await UserModel.findOne({ _id: userId });
        const { star, username } = user;
        const code = await ArticleModel.insertMany({
            userId,
            title,
            describe,
            username,
        });
        if (code) {
            const updataRes = await UserModel.updateOne({ _id: userId }, { $set: { star: star + 10 } })
        }
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
