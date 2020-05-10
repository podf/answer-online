const UserModel = require('../model');


const UserModifyInfo = async (ctx, next) => {
    const { body: { userId, username, sign, phone, email, info } } = ctx.request;
    const failed = (code, message) => {
        ctx.body = {
            code: code,
            success: false,
            message: message,
        }
    }
    try {
        const res = await UserModel.findByIdAndUpdate({ _id: userId }, { $set: { username, sign, phone, email, info } })
    } catch (error) {
        failed(1, 'updata error');
    }
    ctx.body = {
        code: 0,
        message: 'success'
    };
}

module.exports = UserModifyInfo;