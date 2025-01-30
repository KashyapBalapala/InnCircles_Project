const mongoose = require('mongoose');

const quantitySchema = new mongoose.Schema({
    locationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Location',
      required: true,
    },
    workerPackageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'WorkerPackage',
      required: true,
    },
    uomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UomManagement',
      required: true,
    },
    quantityValue: {
      type: Number,
      required: true,
      min: 0,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
});

module.exports = mongoose.model('Quantity', quantitySchema);