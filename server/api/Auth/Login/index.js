// import mongoose from 'mongoose';
const UserModel = require('../model');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

// 将秘钥放到配置文件中，不要存在GitHub代码托管平台中
const SECRET = 'qmlmvdjsoja013417y240..!^*&l---';

const Login = async (req, res) => {
    const {
        body: { username, password }
    } = req;
    const failed = (code, message) => {
        res.status(200).json({
            code: code,
            success: false,
            message: message,
        });
    }
    let foundUser = '';

    try {
        foundUser = await UserModel.findOne({ username }).exec();
        if (!foundUser) {
            failed(401, '该用户不存在');
        }

        const passMatch = bcrypt.compareSync(password, foundUser.password);
        if (!passMatch) {
            failed(401, '用户名或密码错误');
        };
    } catch (error) {
        res.status(200).json({
            code: 1,
            message: error,
        });
    }
    const { _id, identity = '1' } = foundUser;
    const token = jwt.sign(String(_id), SECRET);
    res.status(200).json({
        code: 0,
        token,
        username,
        identity,
        message: 'success',
    });
}

module.exports = Login;
// export default Login;
