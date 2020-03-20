const UserModel = require('../model');


const Register = async (ctx, next) => {
    const { body: { username, password, phone, email } } = ctx.request;
    try {
        await UserModel.insertMany({
            username,
            password,
            phone,
            email,
            identity: 1
        });
    } catch (error) {
        ctx.body = {
            code: 406,
            message: error
        };
    }
    ctx.body = {
        code: 0,
        identity: 1,
        message: 'success'
    };
}

module.exports = Register;