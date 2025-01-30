const UnitOfMeasurement = require("../modals/uomManagement.mongo");
const WorkPackage = require("../modals/workerPackage.mongo");
const UOMToWorkPackage = require("../modals/uomToWorkPackages.mongo");

async function httpAddUOM(req, res) {
  try {
    const { name, abbreviation, description } = req.body;

    if (!name || !abbreviation) {
      return res
        .status(400)
        .json({ message: "Name and Abbreviation are required." });
    }

    const existingUOM = await UnitOfMeasurement.findOne({
      $or: [{ name }, { abbreviation }],
    });
    if (existingUOM) {
      return res
        .status(400)
        .json({
          message: "UOM with this name or abbreviation already exists.",
        });
    }

    const uom = new UnitOfMeasurement({ name, abbreviation, description });
    await uom.save();

    return res
      .status(201)
      .json({ message: "UnitOfMeasurement created successfully.", uom });
  } catch (error) {
    console.error("Error creating UnitOfMeasurement:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function httpGetUOM(req, res) {
  try {
    const uoms = await UnitOfMeasurement.find();
    return res.status(200).json(uoms);
  } catch (error) {
    console.error("Error fetching UnitOfMeasurements:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function httpUpdateUOM(req, res) {
  try {
    const { id } = req.params;
    const { name, abbreviation, description } = req.body;

    if (!name || !abbreviation) {
      return res
        .status(400)
        .json({ message: "Name and Abbreviation are required." });
    }

    const existingUOM = await UnitOfMeasurement.findOne({
      $or: [
        { name, _id: { $ne: id } },
        { abbreviation, _id: { $ne: id } },
      ],
    });
    if (existingUOM) {
      return res
        .status(400)
        .json({
          message: "UOM with this name or abbreviation already exists.",
        });
    }

    const updatedUOM = await UnitOfMeasurement.findByIdAndUpdate(
      id,
      { name, abbreviation, description },
      { new: true, runValidators: true }
    );

    if (!updatedUOM) {
      return res.status(404).json({ message: "UnitOfMeasurement not found." });
    }

    return res
      .status(200)
      .json({
        message: "UnitOfMeasurement updated successfully.",
        uom: updatedUOM,
      });
  } catch (error) {
    console.error("Error updating UnitOfMeasurement:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function httpDeleteUOM(req, res) {
  try {
    const { id } = req.params;

    const isAssigned = await UOMToWorkPackage.exists({ uomId: id });

    if (isAssigned) {
      return res
        .status(400) 
        .json({
          message: "Cannot delete UOM. It is assigned to a Work Package.",
        });
    }

    const deletedUOM = await UnitOfMeasurement.findByIdAndDelete(id);
    if (!deletedUOM) {
      return res.status(404).json({ message: "UnitOfMeasurement not found." });
    }

    return res
      .status(200)
      .json({ message: "UnitOfMeasurement deleted successfully." });
  } catch (error) {
    console.error("Error deleting UnitOfMeasurement:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  httpDeleteUOM,
  httpUpdateUOM,
  httpGetUOM,
  httpAddUOM,
};
