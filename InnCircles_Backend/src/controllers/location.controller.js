const Location = require("../modals/location.mongo");
const LocationType = require("../modals/locationType.mongo");
const Quantity = require("../modals/quantity.mongo");

async function httpAddLocation(req, res) {
  try {
    const { name, locationTypeId, description } = req.body;

    const locationTypeExists = await LocationType.findById(locationTypeId);
    if (!locationTypeExists) {
      return res.status(404).json({ message: "LocationType not found." });
    }
    const existingType = await Location.findOne({ name });
        if (existingType) {
          return res.status(400).json({ message: "LocationType already exists." });
        }

    const location = new Location({ name, locationTypeId, description });
    await location.save();

    return res
      .status(201)
      .json({ message: "Location created successfully.", location });
  } catch (error) {
    console.error("Error creating Location:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function httpGetLocation(req, res) {
  try {
    const locations = await Location.find().populate("locationTypeId", "name");
    return res.status(200).json(locations);
  } catch (error) {
    console.error("Error fetching Locations:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function httpUpdateLocation(req, res) {
  try {
    const { id } = req.params;
    const { name, locationTypeId, description } = req.body;

    if (locationTypeId) {
      const locationTypeExists = await LocationType.findById(locationTypeId);
      if (!locationTypeExists) {
        return res.status(404).json({ message: "LocationType not found." });
      }
    }

    const updatedLocation = await Location.findByIdAndUpdate(
      id,
      { name, locationTypeId, description },
      { new: true, runValidators: true }
    );

    if (!updatedLocation) {
      return res.status(404).json({ message: "Location not found." });
    }

    return res
      .status(200)
      .json({
        message: "Location updated successfully.",
        location: updatedLocation,
      });
  } catch (error) {
    console.error("Error updating Location:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function httpDeleteLocation(req, res) {
  try {
    const { id } = req.params;

    const isUsedInQuantities = await Quantity.exists({ locationId: id });
    if (isUsedInQuantities) {
      return res.status(400).json({
        message: "Cannot delete Location. It has assigned quantities.",
      });
    }

    const deletedLocation = await Location.findByIdAndDelete(id);
    if (!deletedLocation) {
      return res.status(404).json({ message: "Location not found." });
    }

    return res.status(200).json({ message: "Location deleted successfully." });
  } catch (error) {
    console.error("Error deleting Location:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function httpGetLocationByType(req, res) {
  try {
    const { locationTypeId } = req.params;

    const locations = await Location.find({ locationTypeId }).populate(
      "locationTypeId",
      "name"
    );

    if (!locations.length) {
      return res
        .status(404)
        .json({
          message: "No Locations found for the specified LocationType.",
        });
    }

    return res.status(200).json(locations);
  } catch (error) {
    console.error("Error fetching Locations by LocationType:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}


module.exports = {
  httpDeleteLocation,
  httpUpdateLocation,
  httpGetLocation,
  httpAddLocation,
  httpGetLocationByType,
};
