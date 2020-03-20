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



// jwt({ SECRET });

const app = new Koa();
app.use(cors());
app.use(bodyParser());
connectMongo(app);

const router = new Router;

router
    .get('/api/identity', jwt({ secret: SECRET }), admin, async (ctx) => {
        const { username, identity } = ctx.state.user;
        ctx.body = {
            username,
            identity,
        }
    })
    .post('/api/login', Login)
    .post('/api/register', Rigister)


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