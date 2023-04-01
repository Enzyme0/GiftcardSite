"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const port = 3000;
const mongo = require('mongodb').MongoClient;
const env = require('dotenv').config();
//use cookies
const cookieParser = require('cookie-parser');
const loginRouter = require('./routes/login');
app.use(cookieParser());
app.use('/login', loginRouter);
app.get('/', (req, res) => {
    res.send('well cum to giftcard stap');
});
//q: how do i declare the type of req and res?
//a: req and res are of type Request and Response respectively
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
