const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors package
const app = express();
// const port = 3000;
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Use built-in JSON handling middleware
app.use(express.json());


let linkh = "https://ap-south-1.aws.data.mongodb-api.com/app/data-nqxbv/endpoint/data/v1";
let apikey = 'jTh9rP881NYXCfOmNfgTaHa6s0ZS72MNqnEcY5yYLlRodRQ5u9a7olInimzxzxi0';

let collection = "weather-data";
let database = "nashik-hourly";

app.post('/add-city', (req, res) => {
    // Process the form data from req.body
    const { timezone, tzoffset, city, country } = req.body;

    // You can now use this data to construct the payload for your Axios request
    const axiosData = {
        collection: collection,
        database: database,
        dataSource: "Cluster0",
        document: {
            "timezone": timezone,
            "tzoffset": tzoffset,
            "name": city + "," + country,
            "days": []
        }
    };

    const config = {
        method: 'post',
        url: linkh + '/action/insertOne',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': apikey,
        },
        data: JSON.stringify(axiosData) // Pass the constructed data here
    };

    // Use Axios to make the request
    axios(config)
        .then(function (response) {
            // Handle the Axios response
            console.log(JSON.stringify(response.data));
            res.json({ message: 'Form submitted and data sent to MongoDB' });
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({ error: 'Error occurred while sending data to MongoDB' });
        });
});

app.post('/add-day-in-city', (req, res) => {
    // Process the form data from req.body
    const { city, country, date, tempmax, tempmin, humidity, conditions } = req.body;

    // You can now use this data to construct the payload for your Axios request
    const axiosData = {
        "collection": collection,
        "database": database,
        "dataSource": "Cluster0",
        "filter": {
            "name": city + "," + country
        },
        "update": {
            "$addToSet": {
                "days": {
                    "datetime": date,
                    "tempmax": tempmax,
                    "tempmin": tempmin,
                    "humidity": humidity,
                    "conditions": conditions
                }
            }

        },
        "upsert": "true"
    };

    const config = {
        method: 'post',
        url: linkh + '/action/updateOne',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': apikey,
        },
        data: JSON.stringify(axiosData) // Pass the constructed data here
    };

    // Use Axios to make the request
    axios(config)
        .then(function (response) {
            // Handle the Axios response
            console.log(JSON.stringify(response.data));
            res.json({ message: 'Form submitted and data sent to MongoDB' });
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({ error: 'Error occurred while sending data to MongoDB' });
        });
});

app.get('/forward-city-data', (req, res) => {
    // const data = { message: 'Hello from the server!' };
    // res.json(data);

    const axiosData = JSON.stringify({
        "collection": collection,
        "database": database,
        "dataSource": "Cluster0",
        "filter" : {},
        "projection" : {
            "_id" : 0,
            "name" : 1,
            "timezone": 1,
            "tzoffset": 1
        },
        // "limit" : 2
    });

    const config = {
        method: 'post',
        url: linkh + '/action/find',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': apikey,
        },
        data: axiosData
    };

    axios(config)
        .then(function (response) {
            // Handle the Axios response
            console.log(JSON.stringify(response.data));
            // res.json({ message: 'Data recieved from Server' });
            data = response.data
            res.json(data);
        })
        .catch(function (error) {
            console.log(error);
            res.status(500).json({ error: 'Error occurred while sending data to MongoDB' });
        });

});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});