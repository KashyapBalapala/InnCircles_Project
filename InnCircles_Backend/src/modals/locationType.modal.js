const locationTypes = require('./locationType.mongo');


async function addLocationType(location) {
    await locationTypes.findOneAndUpdate({
        
    })
}

async function getLocationTypeById(id) {
    const locationType = await locationTypes.findById(id);
    return locationType;
}

module.exports = {
    getLocationTypeById
} 