const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');

const connectMongo = require('./database')

const Login = require('./api/Auth/Login');
const Rigister = require('./api/Auth/Rigister');

const app = express();

// app.use(cors());
// app.use(express.json());
app.use(cors({ credentials: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '100mb' }));

connectMongo(app);

app.post('/login', Login);
app.post('/register', Rigister);



app.listen(3001, () => {
    console.log('server start');
})