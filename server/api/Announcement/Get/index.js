// import mongoose from 'mongoose';
const AnnouncementModel = require('../model');

const GetAnnouncement = async (ctx, next) => {
    const failed = (code, message) => {
        ctx.body = {
            code: code,
            success: false,
            message: message,
        }
    }

    try {
        const announcement = await AnnouncementModel.findOne({});
        ctx.response.body = {
            code: 0,
            announcement,
            message: 'success',
        }
    } catch (error) {
        console.log(error, 'error ');
        failed(1, error);
        return;
    }
}

module.exports = GetAnnouncement;
