const WorkPackageUOM = require("../modals/uomToWorkPackages.mongo");
const WorkPackage = require("../modals/workerPackage.mongo");
const UnitOfMeasurement = require("../modals/uomManagement.mongo");

// async function httpAddUomsToWP(req, res) {
//   try {
//     const { id } = req.params;
//     const { uomId } = req.body;

//     const workPackageExists = await WorkPackage.findById(id);
//     if (!workPackageExists) {
//       return res.status(404).json({ message: "Work Package not found." });
//     }

//     const uomExists = await UnitOfMeasurement.findById(uomId);
//     if (!uomExists) {
//       return res
//         .status(404)
//         .json({ message: "Unit of Measurement not found." });
//     }

//     const existingAssignment = await WorkPackageUOM.findOne({
//       workerPackageId: id,
//       uomId,
//     });
//     if (existingAssignment) {
//       return res
//         .status(400)
//         .json({ message: "UOM is already assigned to this Work Package." });
//     }

//     const newAssignment = new WorkPackageUOM({ workerPackageId: id, uomId });
//     await newAssignment.save();

//     return res.status(201).json({
//       message: "UOM assigned successfully.",
//       assignment: newAssignment,
//     });
//   } catch (error) {
//     console.error("Error assigning UOM:", error);
//     return res.status(500).json({ message: "Server Error" });
//   }
// }

async function httpDeleteUomsToWP(req, res) {
  try {
    const { workerPackageId, uomId } = req.params;

    const workPackageExists = await WorkPackage.findById(workerPackageId);
    console.log(workPackageExists);
    if (!workPackageExists) {
      return res.status(404).json({ message: "Work Package not found." });
    }

    const uomExists = await UnitOfMeasurement.findById(uomId);
    if (!uomExists) {
      return res
        .status(404)
        .json({ message: "Unit of Measurement not found." });
    }

    const assignment = await WorkPackageUOM.findOneAndDelete({
      workerPackageId,
      uomId,
    });
    if (!assignment) {
      return res
        .status(404)
        .json({ message: "UOM is not assigned to this Work Package." });
    }

    return res.status(200).json({ message: "UOM removed successfully." });
  } catch (error) {
    console.error("Error removing UOM:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function httpGetAllUomsToWP(req, res) {
  try {
    const { id } = req.params;

    const workPackageExists = await WorkPackage.findById(id);
    if (!workPackageExists) {
      return res.status(404).json({ message: "Work Package not found." });
    }

    const assignedUOMs = await WorkPackageUOM.find({
      workerPackageId: id,
    }).populate("uomId", "name abbreviation");
    return res.status(200).json(assignedUOMs.map((entry) => entry.uomId));
  } catch (error) {
    console.error("Error fetching UOMs for Work Package:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function httpAddMultipleUomsToWP(req, res) {
  try {
    const { id } = req.params;
    const { uomIds } = req.body;
    if (!Array.isArray(uomIds) || uomIds.length === 0) {
      return res
        .status(400)
        .json({ message: "Invalid UOM IDs. Must be a non-empty array." });
    }

    const workPackageExists = await WorkPackage.findById(id);
    if (!workPackageExists) {
      return res.status(404).json({ message: "Work Package not found." });
    }

    const validUoms = await UnitOfMeasurement.find({ _id: { $in: uomIds } });
    const validUomIds = validUoms.map((uom) => uom._id.toString());

    if (validUomIds.length === 0) {
      return res
        .status(404)
        .json({ message: "No valid Units of Measurement found." });
    }

    const existingAssignments = await WorkPackageUOM.find({
      workerPackageId: id,
      uomId: { $in: validUomIds },
    });

    const existingUomIds = new Set(
      existingAssignments.map((assign) => assign.uomId.toString())
    );

    const newUomsToAssign = validUomIds.filter(
      (uomId) => !existingUomIds.has(uomId)
    );

    if (newUomsToAssign.length === 0) {
      return res.status(400).json({
        message: "All provided UOMs are already assigned to this Work Package.",
      });
    }

    const newAssignments = newUomsToAssign.map((uomId) => ({
      workerPackageId: id,
      uomId,
    }));

    await WorkPackageUOM.insertMany(newAssignments);

    return res.status(201).json({
      message: "UOMs assigned successfully.",
      assignments: newAssignments,
    });
  } catch (error) {
    console.error("Error assigning UOMs:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

async function httpGetWorkPackagesWithUOMs(req, res) {
  try {
    const { locationTypeId } = req.params;

    const workPackages = await WorkPackage.find({ locationTypeId }).populate(
      "locationTypeId",
      "name"
    );

    if (!workPackages.length) {
      return res.status(404).json({
        message: "No Work Packages found for the specified Location Type.",
      });
    }

    const workerPackageIds = workPackages.map((wp) => wp._id);
    const uomAssignments = await WorkPackageUOM.find({
      workerPackageId: { $in: workerPackageIds },
    }).populate("uomId");

    const uomMap = {};
    uomAssignments.forEach((entry) => {
      const wpId = entry.workerPackageId.toString();
      if (!uomMap[wpId]) {
        uomMap[wpId] = [];
      }
      uomMap[wpId].push(entry.uomId);
    });

    const result = workPackages.map((wp) => ({
      ...wp.toObject(),
      uoms: uomMap[wp._id.toString()] || [],
    }));

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching Work Packages with UOMs:", error);
    return res.status(500).json({ message: "Server Error" });
  }
}

module.exports = {
  httpGetAllUomsToWP,
  httpDeleteUomsToWP,
  httpAddMultipleUomsToWP,
  httpGetWorkPackagesWithUOMs,
};
