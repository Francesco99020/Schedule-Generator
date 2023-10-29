const express = require('express');
const cors = require('cors');
const { GenerateNewSchedule } = require('./scheduleGenerator');
const { getDistancesFromTarget } = require('./postalCompare');
const { mockApiData } = require('./mockData');
const { sortEmployeesByDist } = require('./sortByDist');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/schedule/generator', (req, res) => {
    try {
        const request = req.body;

        //extract request params
        const employeesNeeded = request.employeesNeeded;
        const JobsiteZipCode = request.JobsiteZipCode;

        //extracts all employee zipcodes (would possibly store in mongo for lookup)
        let employeeZipCodes = [];
        for(i = 0; i < mockApiData.length; i++){
            employeeZipCodes.push(mockApiData[i].postalCode);
        }

        //returns dist from jobsite
        const employeeDistFromJobsite = getDistancesFromTarget(JobsiteZipCode, employeeZipCodes);

        //sort employees by dist of jobsite
        const sortedEmployeesByDist = sortEmployeesByDist(mockApiData ,employeeDistFromJobsite)

        const response = GenerateNewSchedule(employeesNeeded, sortedEmployeesByDist);

        res.json({ message: response });
    } catch (error) {
        console.error('Internal Server Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});