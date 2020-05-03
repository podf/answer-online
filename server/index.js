const Koa = require('koa');
const cors = require('koa2-cors');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const { SECRET } = require('../setting.json');
const jwt = require('koa-jwt');


const connectMongo = require('./database')
const admin = require('./middwares/admin')();

const Login = require('./api/Auth/Login');
const Rigister = require('./api/Auth/Rigister');
const UserInfo = require('./api/Auth');
const UserModifyInfo = require('./api/Auth/Modify');

const Edit = require('./api/Article/Edit');
const Get = require('./api/Article/Get');
const GetItem = require('./api/Article/GetItem');
const Comment = require('./api/Article/Comment');
const EditComment = require('./api/Article/Comment/Edit');

const RankingList = require('./api/Ranking');


const app = new Koa();
app.use(cors());
app.use(bodyParser());
connectMongo(app);

const router = new Router();

// app.use(jwt({
//     secret: SECRET
// }).unless({
//     path: [/^\/api\/login/]
// }));

router
    // 带上jwt就会产生跨域
    // .post('/api/login', jwt({ secret: SECRET }), Login)
    // User
    .post('/api/login', Login)
    .get('/api/identity', jwt({ secret: SECRET }), admin, async (ctx) => {
        const { username, identity } = ctx.state.user;
        ctx.body = {
            username,
            identity,
        }
    })
    .post('/api/register', Rigister)
    .get('/api/user/info/:_id', UserInfo)
    .post('/api/user/info/', UserModifyInfo)
    // article
    .post('/api/article', Edit)
    .get('/api/article', Get)
    .get('/api/article/:_id', GetItem)
    // comment
    .get('/api/comment/:_id', Comment)
    .post('/api/comment', EditComment)
    // Ranking
    .get('/api/ranking/:userId', RankingList)


// router.routes() 将所有路由挂载
// router.allowedMethods 如果未找到定义的路由，返回出错信息
app.use(router.routes()).use(router.allowedMethods())
app.listen(3001, () => {
    console.log('start server');
})


















// const app = express();

// // app.use(cors());
// // app.use(express.json());
// app.use(cors({ credentials: true }));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json({ limit: '100mb' }));

// connectMongo(app);

// app.post('/login', Login);
// app.post('/register', Rigister);



// app.listen(3001, () => {
//     console.log('server start');
// })