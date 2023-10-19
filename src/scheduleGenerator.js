const { mockApiData } = require('./mockData');

function GenerateNewSchedule(workersRequired){
    let response = [];
    for(i = 0; i < workersRequired; i++){
        response.push(mockApiData[Math.floor(Math.random() * mockApiData.length)]);
    }
    return response;
}

module.exports = { GenerateNewSchedule };