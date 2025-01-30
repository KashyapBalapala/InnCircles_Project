const mongoose = require('mongoose');
const workerPackageMongo = require('./workerPackage.mongo');

const location = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    locationTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'LocationType',
        required: true,
    },
    description: {
        type: String,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('Location', location);