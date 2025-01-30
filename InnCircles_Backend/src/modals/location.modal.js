const Location = require('./location.mongo'); 

async function addLocation(location) {
    return await location.save();
}