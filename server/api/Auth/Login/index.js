// import mongoose from 'mongoose';
const bcrypt = require('bcryptjs');
const { sign } = require('jsonwebtoken');

const UserModel = require('../model');
const { SECRET } = require('../../../../setting.json');

const Login = async (ctx, next) => {
    const {
        body: { username, password }
    } = ctx.request;

    const failed = (code, message) => {
        ctx.body = {
            code: code,
            success: false,
            message: message,
        }
    }
    let foundUser = '';

    try {
        foundUser = await UserModel.findOne({ username }).exec();
        if (!foundUser) {
            failed(401, '该用户不存在');
            return;
        }
        const passMatch = bcrypt.compareSync(password, foundUser.password);
        if (!passMatch) {
            failed(401, '用户名或密码错误');
            return;
        };
    } catch (error) {
        ctx.response.body = {
            code: 1,
            message: error,
        }
        return;
    }
    const { _id, identity = '1' } = foundUser;
    const token = sign({ _id, username, identity }, SECRET, { expiresIn: '1h' });
    ctx.response.body = {
        code: 0,
        token,
        username,
        identity,
        message: 'success',
    }
}

module.exports = Login;
