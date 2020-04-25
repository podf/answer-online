const UserModel = require('./model');

const UserInfo = async (ctx, next) => {
    const { _id } = ctx.params;


    const failed = (code, message) => {
        ctx.body = {
            code: code,
            success: false,
            message: message,
        }
    }

    try {
        const info = await UserModel.findOne({ _id }).exec();
        if (!info) {
            failed(401, '该用户不存在');
            return;
        }
        ctx.response.body = {
            code: 0,
            info,
            message: 'success',
        }
    } catch (error) {
        console.log(error, 'error ');
        failed(1, error);
        return;
    }


}

module.exports = UserInfo;
