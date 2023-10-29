const { mockApiData } = require('./mockData');

function GenerateNewSchedule(workersRequired, sortEmployeesByDist){
    let response = [];
    // for(i = 0; i < workersRequired; i++){
    //     response.push(mockApiData[Math.floor(Math.random() * mockApiData.length)]);
    // }

    for(i = 0; i < workersRequired; i++){
        response.push(sortEmployeesByDist[i]);
    }

    return response;
}

module.exports = { GenerateNewSchedule };