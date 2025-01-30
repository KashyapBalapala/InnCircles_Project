const mongoose = require('mongoose');

const uomToWorkPackages = new mongoose.Schema({
    createdAt: {
        type: Date,
        default: Date.now,
      },
    workerPackageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkerPackage'
    },
    uomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UomManagement'
    }
});

module.exports = mongoose.model('UOMToWorkPackage', uomToWorkPackages);