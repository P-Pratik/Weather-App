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

            const link = document.createElement("a");
            link.textContent = "View Details";
            link.href = `citydetails.html?name=${item.name}`;
            const linkCell = document.createElement("td");
            linkCell.appendChild(link);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";

            row.appendChild(idCell);
            row.appendChild(nameCell);
            row.appendChild(timezoneCell);
            row.appendChild(tzoffsetCell);
            row.appendChild(linkCell);
            row.appendChild(deleteButton);
            tableBody.appendChild(row);

            // Add a click event listener for the "Delete" button within each row
            deleteButton.addEventListener("click", () => {
                let name = item.name;
                console.log(name);
                fetch('http://localhost:3000/delete-city', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        alert("Data Deleted Successfully");
                    })
                    .catch((error) => {
                        console.error('Error:', error);
                    });
            });
        });
    })
    .catch(error => {
        console.error('Error:', error);
    });
