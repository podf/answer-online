module.exports = () => {
    return async (ctx, next) => {
        ctx.state.user.identity === 2 ? next() : ctx.body = {
            code: 401,
            message: '权限不足'
        }
    }
}