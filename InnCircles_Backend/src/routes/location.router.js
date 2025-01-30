const express = require('express');

const {
    httpDeleteLocation,
    httpUpdateLocation,
    httpGetLocation,
    httpAddLocation,
    httpGetLocationByType
} = require('../controllers/location.controller');

locationRouter = express.Router();

locationRouter.post('/', httpAddLocation);
locationRouter.get('/', httpGetLocation);
locationRouter.put('/:id', httpUpdateLocation);
locationRouter.delete('/:id', httpDeleteLocation);
locationRouter.get('/location-type/:locationTypeId', httpGetLocationByType);

module.exports = locationRouter;