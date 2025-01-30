const mongoose = require('mongoose');

const workerPackage = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    locationTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LocationType',
        required: true
    },
    description : {
        type: String,
        trim: true
    },
    uomId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserManagement'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('WorkerPackage', workerPackage);