const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const announcementSchema = new Schema({
    userId: { type: String },
    username: { type: String },
    describe: { type: String },
}, { timestamps: { createdAt: 'created', updatedAt: 'updated' } });


const AnnouncementModel = mongoose.model('announcement', announcementSchema);

module.exports = AnnouncementModel;
