const express = require('express');
var cors = require("cors");

const app = express();

app.use(cors());
app.post('/login', async (req, res) => {
    res.send({code: 0})
})


app.listen(3001, () => {
    console.log('server start');
})