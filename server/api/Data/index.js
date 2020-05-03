const AnnouncementModel = require('../Announcement/model');
const ArticleModel = require('../Article/model');
const UserModel = require('../Auth/model');
const CommentsModel = require('../Article/model/comment');

const DataClear = async (ctx, next) => {
    const failed = (code, message) => {
        ctx.body = {
            code: code,
            success: false,
            message: message,
        }
    }

    try {
        await UserModel.deleteMany({});
        await ArticleModel.deleteMany({});
        await CommentsModel.deleteMany({});
        await AnnouncementModel.deleteMany({});
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

module.exports = DataClear;
