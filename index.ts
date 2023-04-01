const express = require('express');
const app = express();
const port = 3000;
const mongo = require('mongodb').MongoClient;
const env = require('dotenv').config();
import { router } from './routes/login';

//use cookies
const cookieParser = require('cookie-parser');

const loginRouter = require('./routes/login');
app.use(cookieParser());
app.use('/login', loginRouter);

app.get('/', (req: Request, res: { send: (arg0: string) => void; }) => {
    res.send('well cum to giftcard stap');
});
//q: how do i declare the type of req and res?
//a: req and res are of type Request and Response respectively
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});