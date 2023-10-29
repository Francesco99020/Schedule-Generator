const generateButton = document.getElementById('generate-button');
const numberDropdown = document.getElementById('numberDropdown');
const zipCodeInput = document.getElementById('zipCode');

function isZipCodeValid(zipCode) {
    return /^\d{5}$/.test(zipCode); // Check if the ZIP code is exactly 5 digits
}

function updateGenerateButtonState() {
    const numOfEmployees = numberDropdown.value;
    const zipCode = zipCodeInput.value;
    const isValidZipCode = isZipCodeValid(zipCode);

    // Enable the button only if a number is selected and ZIP code is valid
    generateButton.disabled = !(numOfEmployees && isValidZipCode);
}

zipCodeInput.addEventListener('input', updateGenerateButtonState);
numberDropdown.addEventListener('change', updateGenerateButtonState);

async function sendMessageToServer(){
    let numOfEmployees;
    if(numberDropdown.value) numOfEmployees = Number(numberDropdown.value);
    else numOfEmployees = 5;
    const zipCode = zipCodeInput.value;
    try{
        const response = await fetch('http://localhost:3000/api/schedule/generator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ employeesNeeded: numOfEmployees, JobsiteZipCode: zipCode})
        });

        if(response.ok){
            const data = await response.json();

            //Display Schedule
            DisplaySchedule(data.message)
        }else{
            console.error('Failed to receive a valid response from the server.');
        }

    }catch (error) {
        console.error('Error sending message to the server:', error);
      }
}

// Initial button state check
updateGenerateButtonState();

function DisplaySchedule(data) {
    const container = document.querySelector('.schedule-container');

    if (!container) {
        console.error('Schedule container not found.');
        return;
    }

    if (!Array.isArray(data) || data.length === 0) {
        console.error('Invalid or empty data array.');
        return;
    }

    const table = document.createElement('table');
    table.classList.add('schedule-table');

    table.style.borderCollapse = 'collapse';
    table.style.width = '70%'; // Adjust the width as needed

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `<th>ID</th><th>First Name</th><th>Last Name</th><th>Postal Code</th><th>Distance (miles)</th>`;

    // Add borders and padding to the header cells
    headerRow.querySelectorAll('th').forEach((th) => {
        th.style.border = '1px solid #000';
        th.style.padding = '8px';
    });

    thead.appendChild(headerRow);

    // Create table body
    const tbody = document.createElement('tbody');

    // Iterate through the data and create rows
    data.forEach((item) => {
        const row = document.createElement('tr');
        // Use toFixed(1) to round the number to one decimal place
        row.innerHTML = `<td>${item.id}</td><td>${item.first_name}</td><td>${item.last_name}</td><td>${item.postalCode}</td><td>${item.distanceFromTarget.toFixed(1)} miles</td>`;

        // Add borders and padding to the cells in the body
        row.querySelectorAll('td').forEach((td) => {
            td.style.border = '1px solid #000';
            td.style.padding = '8px';
        });

        tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    // Append the table to the container
    container.appendChild(table);
}



generateButton.addEventListener('click', sendMessageToServer);