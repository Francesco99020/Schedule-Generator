const generateButton = document.getElementById('generate-button');
const numberDropdown = document.getElementById('numberDropdown');

async function sendMessageToServer(){
    let numOfEmployees;
    if(numberDropdown.value) numOfEmployees = Number(numberDropdown.value);
    else numOfEmployees = 5;
    try{
        const response = await fetch('http://localhost:3000/api/schedule/generator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: numOfEmployees })
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
//displays new schedule 
function DisplaySchedule(data){
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

    // Add borders to the table using CSS
    table.style.borderCollapse = 'collapse';
    table.style.width = '50%';

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `<th>ID</th><th>First Name</th><th>Last Name</th><th>Address</th>`;

    // Add borders to the header cells
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
        row.innerHTML = `<td>${item.id}</td><td>${item.first_name}</td><td>${item.last_name}</td><td>${item.address}</td>`;

        // Add borders to the cells in the body
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