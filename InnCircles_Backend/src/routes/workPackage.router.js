const express = require('express');
const {
    httpDeleteWorkerPackage,
    httpUpdateWorkPackage,
    httpGetWorkPackages,
    httpAddWorkPackage,
    httpGetLocationTypeWorkPackages,
} = require('../controllers/workerPackage.controller');

const  {
    httpGetAllUomsToWP,
    httpDeleteUomsToWP,
    httpGetWorkPackagesWithUOMs,
    httpAddMultipleUomsToWP
}  = require('../controllers/uomToWp.controller');


const workPakackageRouter = express.Router();

workPakackageRouter.post('/', httpAddWorkPackage);
workPakackageRouter.get('/', httpGetWorkPackages);
workPakackageRouter.get('/location-type/:locationTypeId', httpGetLocationTypeWorkPackages);
workPakackageRouter.put('/:id', httpUpdateWorkPackage);
workPakackageRouter.delete('/:id', httpDeleteWorkerPackage);


workPakackageRouter.post('/:id/uoms', httpAddMultipleUomsToWP);
workPakackageRouter.delete('/:workerPackageId/uoms/:uomId', httpDeleteUomsToWP);
workPakackageRouter.get('/:id/uoms', httpGetAllUomsToWP);
workPakackageRouter.get('/uom/:locationTypeId', httpGetWorkPackagesWithUOMs);


module.exports = workPakackageRouter;