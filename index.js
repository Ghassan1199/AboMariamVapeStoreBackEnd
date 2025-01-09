const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const dotenv = require('dotenv');
dotenv.config();
const morgan = require('morgan');
const {connectDB} = require('./api/models/index');
const router = require('./api/routes/index');

const app = express();


app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev'))

connectDB().then(r => console.log('Connected to DB')).catch(err => console.error(err));

app.use(router);


module.exports = app;
