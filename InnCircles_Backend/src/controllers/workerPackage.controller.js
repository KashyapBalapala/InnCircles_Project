const { getLocationTypeById } = require("../modals/locationType.modal");
const workPackagesSchema = require("../modals/workerPackage.mongo");
const UOMToWorkPackage = require("../modals/uomToWorkPackages.mongo");
const Quantity = require("../modals/quantity.mongo");
const Location = require("../modals/location.mongo");

async function httpAddWorkPackage(req, res) {
  try {
    const { name, locationTypeId, description } = req.body;
    const locationTypeExsists = await getLocationTypeById(locationTypeId);
    if (!locationTypeExsists) {
      return res.status(404).json({ message: "LocationType not found." });
    }

    const existingType = await workPackagesSchema.findOne({ name });
        if (existingType) {
          return res.status(400).json({ message: "WorkPackage already exists." });
        }

    const workPackage = new workPackagesSchema({
      name,
      locationTypeId,
      description,
    });
    await workPackage.save();

    return res
      .status(201)
      .json({ message: "WorkPackage created successfully.", workPackage });
  } catch (error) {
    console.error("Error creating WorkPackage:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function httpGetWorkPackages(req, res) {
  try {
    const workPackages = await workPackagesSchema
      .find()
      .populate("locationTypeId", "name");

    const groupedWorkPackages = workPackages.reduce((acc, workPackage) => {
      const locationTypeName = workPackage.locationTypeId.name;
      if (!acc[locationTypeName]) {
        acc[locationTypeName] = [];
      }
      acc[locationTypeName].push(workPackage);
      return acc;
    }, {});

    return res.status(200).json(groupedWorkPackages);
  } catch (error) {
    console.error("Error fetching WorkPackages:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function httpUpdateWorkPackage(req, res) {
  try {
    const { id } = req.params;
    const { name, locationTypeId, description } = req.body;

    if (locationTypeId) {
      const locationTypeExists = await getLocationTypeById(locationTypeId);
      if (!locationTypeExists) {
        return res.status(404).json({ message: "LocationType not found." });
      }
    }

    const updatedWorkPackage = await workPackagesSchema.findByIdAndUpdate(
      id,
      { name, locationTypeId, description },
      { new: true, runValidators: true }
    );

    if (!updatedWorkPackage) {
      return res.status(404).json({ message: "WorkPackage not found." });
    }

    return res
      .status(200)
      .json({
        message: "WorkPackage updated successfully.",
        workPackage: updatedWorkPackage,
      });
  } catch (error) {
    console.error("Error updating WorkPackage:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function httpGetLocationTypeWorkPackages(req, res) {
  try {
    const { locationTypeId } = req.params;

    const workPackages = await workPackagesSchema
      .find({ locationTypeId })
      .populate("locationTypeId", "name");

    if (!workPackages.length) {
      return res
        .status(404)
        .json({
          message: "No WorkPackages found for the specified LocationType.",
        });
    }

    return res.status(200).json(workPackages);
  } catch (error) {
    console.error("Error fetching WorkPackages by LocationType:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function httpDeleteWorkerPackage(req, res) {
  try {
    const { id } = req.params;

    const isUsedInUOM = await UOMToWorkPackage.exists({ workerPackageId: id });
    if (isUsedInUOM) {
      return res.status(400).json({
        message: "Cannot delete WorkPackage. It has an assigned UOM.",
      });
    }

    const isUsedInQuantities = await Quantity.exists({ workerPackageId: id });
    if (isUsedInQuantities) {
      return res.status(400).json({
        message: "Cannot delete WorkPackage. It has assigned quantities.",
      });
    }


    const deletedWorkPackage = await workPackagesSchema.findByIdAndDelete(id);

    if (!deletedWorkPackage) {
      return res.status(404).json({ message: "WorkPackage not found." });
    }

    return res
      .status(200)
      .json({ message: "WorkPackage deleted successfully." });
  } catch (error) {
    console.error("Error deleting WorkPackage:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  httpDeleteWorkerPackage,
  httpUpdateWorkPackage,
  httpGetWorkPackages,
  httpAddWorkPackage,
  httpGetLocationTypeWorkPackages,
};
