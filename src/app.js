const express = require('express');
const { productsRouter, salesRouter } = require('./router');

const app = express();
app.use(express.json());

app.use('/products', productsRouter);
app.use('/sales', salesRouter);

module.exports = app;