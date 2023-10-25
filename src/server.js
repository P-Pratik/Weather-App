const express = require('express');
const axios = require('axios');
const cors = require('cors'); // Import the cors package
const app = express();
// const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Use built-in JSON handling middleware
app.use(express.json());


app.post('/add-city', (req, res) => {
    // Process the form data from req.body
    const { timezone, tzoffset, city, country } = req.body;

    // You can now use this data to construct the payload for your Axios request
    const axiosData = {
        collection: "Weather",
        database: "MiniPro",
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
        url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-clape/endpoint/data/v1/action/insertOne',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': 'QZcQn6106uI6SjhuQgvYmRSsQS6lSm48rdkLBXbTAGUIg0k7CSFTErab9QjmbwF8',
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
        "collection": "Weather",
        "database": "MiniPro",
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
        url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-clape/endpoint/data/v1/action/updateOne',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Request-Headers': '*',
            'api-key': 'QZcQn6106uI6SjhuQgvYmRSsQS6lSm48rdkLBXbTAGUIg0k7CSFTErab9QjmbwF8',
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


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});