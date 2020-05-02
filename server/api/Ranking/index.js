const UserModel = require('../Auth/model');

const RankingList = async (ctx, next) => {
    const rankingList = await UserModel.find({}).sort({ star: 'desc' }).limit(3);
    ctx.response.body = {
        code: 0,
        rankingList,
        message: 'success',
    }
}

module.exports = RankingList;
