// import mongoose from 'mongoose';

const mongoose = require('mongoose');

const Setting = require('../../setting.json');

const app = () => {
    mongoose.set('useCreateIndex', true)
    mongoose.connect(Setting.mongoDB.url, {
        // mongoose.connect('mongodb://localhost:27017/answer-online', {
        auto_reconnect: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}

module.exports = app;
