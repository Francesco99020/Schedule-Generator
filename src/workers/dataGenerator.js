const fs = require('fs');
const csv = require('csv-parser');

const csvFilePath = 'data.csv'; // Replace with your CSV file path
const data = [];

fs.createReadStream(csvFilePath)
  .pipe(csv())
  .on('data', (row) => {
    const obj = {
      id: parseInt(row.id),
      first_name: row.first_name,
      last_name: row.last_name,
      address: row.address
    };
    data.push(obj);
  })
  .on('end', () => {
    // Write the array of objects to a JSON file
    const outputFile = 'output.json'; // Replace with your desired output file name

    fs.writeFileSync(outputFile, JSON.stringify(data, null, 2), 'utf-8');

    console.log('Array of Objects:');
    console.log(data);
    console.log(`Data has been written to ${outputFile}`);
  });
