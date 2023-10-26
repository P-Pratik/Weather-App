fetch('http://localhost:3000/forward-data')
    .then(response => response.json())
    .then(data => {
        console.log(data.message); // Access the data in your frontend

    })
    .catch(error => {
        console.error('Error:', error);
    });