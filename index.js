const express = require('express');
const cors = require('cors');
const category = require('./src/routes/category');
const store = require('./src/routes/store');
const city = require('./src/routes/city');
const product = require('./src/routes/product');
const user = require('./src/routes/user');

const app = express();
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());

app.use('/images', express.static(__dirname + '/public/images'));

app.use('/', store);
app.use('/', category);
app.use('/', city);
app.use('/', product);
app.use('/', user);

app.listen(port);