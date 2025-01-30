const Quantity = require("../modals/quantity.mongo");
const Location = require("../modals/location.mongo");
const WorkerPackage = require("../modals/workerPackage.mongo");
const UnitOfMeasurement = require("../modals/uomManagement.mongo");

async function httpGetQuantity(req, res) {
  try {
    const { id } = req.params;
    const locationExists = await Location.findById(id);
    

    if (!locationExists) {
      return res.status(404).json({ message: "Location not found." });
    }
    const quantities = await Quantity.find({ locationId: id })
      .populate("workerPackageId", "name")
      .populate("uomId", "name abbreviation");

    return res.status(200).json(quantities);
  } catch (error) {
    console.error("Error fetching quantities:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function httpUpdateQuantity(req, res) {
  try {
    const { id } = req.params;
    const { workerPackageId, uomId, quantityValue } = req.body;

    if (isNaN(quantityValue) || quantityValue < 0) {
      return res.status(400).json({
        message: "Quantity must be a valid non-negative number.",
      });
    }

    if (!id || !workerPackageId || !uomId || quantityValue == null) {
      return res.status(400).json({
        message: "All fields are required: location, workPackage, uom, quantity.",
      });
    }

    const locationExists = await Location.findById(id);
    if (!locationExists) {
      return res.status(404).json({ message: "Location not found." });
    }

    const workerPackageExists = await WorkerPackage.findById(workerPackageId);
    if (!workerPackageExists) {
      return res.status(404).json({ message: "Work Package not found." });
    }

    const uomExists = await UnitOfMeasurement.findById(uomId);
    if (!uomExists) {
      return res
        .status(404)
        .json({ message: "Unit of Measurement not found." });
    }

    let quantity = await Quantity.findOne({ locationId: id, workerPackageId, uomId });
    if (quantity) {
      quantity.quantityValue = quantityValue;
      await quantity.save();
      return res
        .status(200)
        .json({ message: "Quantity updated successfully.", quantity });
    }

    quantity = new Quantity({
      locationId: id,
      workerPackageId,
      uomId,
      quantityValue,
    });
    await quantity.save();

    return res
      .status(201)
      .json({ message: "Quantity assigned successfully.", quantity });
  } catch (error) {
    console.error("Error assigning quantity:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  httpUpdateQuantity,
  httpGetQuantity,
};
