const express = require('express');
const cors = require('cors');
const category = require('./src/routes/category');

const app = express();
const port = process.env.SERVER_PORT;

app.use(cors());

app.use('/category', category);

app.listen(port);