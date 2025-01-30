const express = require('express');

const {
    httpDeleteLocationType,
    httpUpdateLocationType,
    httpGetLocationTypes,
    httpAddLocationType,
    httpGetLocationType
} = require('../controllers/locationType.controller');

const locationTypeRouter = express.Router();

locationTypeRouter.post('/', httpAddLocationType);
locationTypeRouter.get('/', httpGetLocationTypes);
locationTypeRouter.put('/:id', httpUpdateLocationType);
locationTypeRouter.delete('/:id', httpDeleteLocationType);
locationTypeRouter.get('/:id', httpGetLocationType);

module.exports = locationTypeRouter;