const LocationType = require("../modals/locationType.mongo");
const Location = require("../modals/location.mongo");
const WorkerPackage = require("../modals/workerPackage.mongo");

async function httpAddLocationType(req, res) {
  try {
    const { name, description } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }
    const existingType = await LocationType.findOne({ name });
    if (existingType) {
      return res.status(400).json({ message: "LocationType already exists." });
    }
    const locationType = new LocationType({ name, description });
    await locationType.save();

    return res
      .status(201)
      .json({ message: "LocationType created successfully.", locationType });
  } catch (error) {
    console.error("Error creating LocationType:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function httpGetLocationTypes(req, res) {
  try {
    const locationTypes = await LocationType.find();
    return res.status(200).json(locationTypes);
  } catch (error) {
    console.error("Error fetching LocationTypes:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function httpUpdateLocationType(req, res) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }

    const existingType = await LocationType.findOne({ name, _id: { $ne: id } });
    if (existingType) {
      return res
        .status(400)
        .json({ message: "LocationType name already in use." });
    }

    const updatedLocationType = await LocationType.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedLocationType) {
      return res.status(404).json({ message: "LocationType not found." });
    }

    return res.status(200).json({
      message: "LocationType updated successfully.",
      locationType: updatedLocationType,
    });
  } catch (error) {
    console.error("Error updating LocationType:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function httpDeleteLocationType(req, res) {
  try {
    const { id } = req.params;

    const isUsedInLocations = await Location.exists({ locationTypeId: id });
    if (isUsedInLocations) {
      return res.status(400).json({
        message: "Cannot delete LocationType. It is used in Locations.",
      });
    }
    const isUsedInWorkPackages = await WorkerPackage.exists({
      locationTypeId: id,
    });
    if (isUsedInWorkPackages) {
      return res.status(400).json({
        message: "Cannot delete LocationType. It is used in Work Packages.",
      });
    }

    const deletedLocationType = await LocationType.findByIdAndDelete(id);
    if (!deletedLocationType) {
      return res.status(404).json({ message: "LocationType not found." });
    }

    return res
      .status(200)
      .json({ message: "LocationType deleted successfully." });
  } catch (error) {
    console.error("Error deleting LocationType:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function httpGetLocationType(req, res) {
  try {
    const { id } = req.params;
    const locationType = await LocationType.findById(id);

    if (!locationType) {
      return res.status(404).json({ message: "LocationType not found." });
    }

    return res.status(200).json(locationType);
  } catch (error) {
    console.error("Error fetching LocationType:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  httpDeleteLocationType,
  httpUpdateLocationType,
  httpGetLocationTypes,
  httpAddLocationType,
  httpGetLocationType,
};
