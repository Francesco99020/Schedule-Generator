const fs = require('fs');
const { zipData } = require('../zipLonLat');

// Extract the "zip" values from the objects
const zipValues = zipData.map(item => item.zip);

// Convert the array of zip values to a comma-separated string
const zipString = zipValues.join(',');

// Write the zipString to a text file
fs.writeFile('zips.txt', zipString, (err) => {
    if (err) {
        console.error('Error writing to file:', err);
    } else {
        console.log('Zips written to zips.txt');
    }
});
