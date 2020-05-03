const UserModel = require('../model');

const GetAllUser = async (ctx, next) => {

    const failed = (code, message) => {
        ctx.body = {
            code: code,
            success: false,
            message: message,
        }
    }

    try {
        const allUser = await UserModel.find({}).exec();
        ctx.response.body = {
            code: 0,
            allUser,
            message: 'success',
        }
    } catch (error) {
        console.log(error, 'error ');
        failed(1, error);
        return;
    }


}

module.exports = GetAllUser;
