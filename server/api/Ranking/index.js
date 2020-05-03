const UserModel = require('../Auth/model');

const RankingList = async (ctx, next) => {
    const { userId } = ctx.params;
    const userInfo = await UserModel.findOne({_id: userId});
    const rankingList = await UserModel.find({}).sort({ star: 'desc' }).limit(3);
    ctx.response.body = {
        code: 0,
        userInfo,
        rankingList,
        message: 'success',
    }
}

module.exports = RankingList;
