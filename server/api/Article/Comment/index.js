const ArticleModel = require('../model');
const CommentModel = require('../model/comment');

const Comment = async (ctx, next) => {
    const { _id } = ctx.params;
    let res = [];

    const failed = (code, message) => {
        ctx.body = {
            code: code,
            success: false,
            message: message,
        }
    }

    const pushParentNode = (item) => {

    }

    const conversionStructure = async (comments, k = []) => {
        if (comments.length < 1) {
            return
        }
        comments.map(async (item, index) => {
            // res.push(item);
            // if (res.length < 1) {
            //     res.push(item);
            // } else {
            //     // console.log(item, 'item')
            //     res[0]["child"].push(item);
            //     // console.log(res[0]["child"], 'reschild')
            //     // console.log(res, 'res')  
            // }
            // 这里按时间排序
            const childComments = await CommentModel.find({ title: _id, parentId: item._id }).exec();
            console.log(childComments, 'childComments')
            if (childComments.length > 0) {
                conversionStructure(childComments, r);
            }
        })
        // res.push(r);
        return res;
    }

    try {
        // 属于当前文章的评论
        // const curComments = await CommentModel.find({ title: _id }).exec();
        // 当前文章顶级评论
        // 这里按时间排序
        // const topComments = await CommentModel.find({ title: _id, parentId: '' }).exec();
        // console.log(topComments, 'topComments')
        // conversionStructure(topComments);
        // console.log(res, 'res kkk')
        const comments = await CommentModel.find({ title: _id }).exec();
        const topComments = await CommentModel.find({ title: _id, parentId: '' }).exec();
        ctx.response.body = {
            code: 0,
            comments,
            topComments,
            message: 'success',
        }
    } catch (error) {
        console.log(error, 'error ');
        failed(1, error);
        return;
    }
}

module.exports = Comment;
