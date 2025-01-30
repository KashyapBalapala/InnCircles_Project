const express = require('express');

const {
    httpDeleteUOM,
    httpUpdateUOM,
    httpGetUOM,
    httpAddUOM
} = require('../controllers/uomManagement.controller');

const uomManagementRouter = express.Router();


uomManagementRouter.post('/', httpAddUOM);
uomManagementRouter.get('/', httpGetUOM);
uomManagementRouter.put('/:id', httpUpdateUOM);
uomManagementRouter.delete('/:id', httpDeleteUOM);

module.exports = uomManagementRouter;