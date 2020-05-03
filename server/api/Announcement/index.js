// import mongoose from 'mongoose';
const AnnouncementModel = require('./model');

const Announcement = async (ctx, next) => {
    const { body: { userId, username, describe } } = ctx.request

    const failed = (code, message) => {
        ctx.body = {
            code: code,
            success: false,
            message: message,
        }
    }

    try {
        await AnnouncementModel.deleteMany({});
        await AnnouncementModel.insertMany({
            userId,
            username,
            describe
        });
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

module.exports = Announcement;
