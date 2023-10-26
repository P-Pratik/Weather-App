fetch('http://localhost:3000/forward-city-data')
    .then(response => response.json())
    .then(data => {
        console.log(data); 

        const tableBody = document.getElementById("data-body");
        let i = 0;
        data.documents.forEach((item) => {
            i++;
            const row = document.createElement("tr");
            const idCell = document.createElement("td");
            idCell.textContent = i;
            const nameCell = document.createElement("td");
            nameCell.textContent = item.name;
            const timezoneCell = document.createElement("td");
            timezoneCell.textContent = item.timezone;
            const tzoffsetCell = document.createElement("td");
            tzoffsetCell.textContent = item.tzoffset;
            
            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(timezoneCell);
            row.appendChild(tzoffsetCell);

            tableBody.appendChild(row);
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
