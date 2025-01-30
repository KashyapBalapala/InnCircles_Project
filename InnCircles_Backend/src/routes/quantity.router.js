const express = require('express');

const {
    httpUpdateQuantity,
    httpGetQuantity
} = require('../controllers/quantity.controller');

quantityRouter = express.Router();

quantityRouter.get('/:id', httpGetQuantity);
quantityRouter.post('/:id', httpUpdateQuantity);

module.exports = quantityRouter;