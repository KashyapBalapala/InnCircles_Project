const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require("path");

const locationTypeRouter = require('./routes/locationType.router');
const workPakackageRouter = require('./routes/workPackage.router');
const uomManagementRouter = require('./routes/uomManagement.router');
const locationRouter = require('./routes/location.router');
const quantityRouter = require('./routes/quantity.router');


const app = express();

app.use(cors());

app.use(morgan('combined'));

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/location-types', locationTypeRouter);
app.use('/work-packages', workPakackageRouter);
app.use('/uom', uomManagementRouter);
app.use('/locations', locationRouter);
app.use('/quantity', quantityRouter);

module.exports = app;