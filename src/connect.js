var axios = require('axios');
var data = JSON.stringify({
    "collection": "Weather",
    "database": "MiniPro",
    "dataSource": "Cluster0",
    // "projection": {
    //     "_id": 1,
    // },
    "document": {
        "latitude" : 20.995,
        "longitude" : 74.7965,
        "resolvedAddress" : "Mumbai, MH, India",
        "address" : "Mumbai,India",
        "timezone" : "Asia/Kolkata",
        "tzoffset" : 5.5,
        "name" : "Mumbai,India",
        "days" : [{
            "datetime" : "2023-10-24",
            "tempmax" : 30.8,
            "tempmin" : 20.7,
            "humidity" : 46.4,
            "conditions" : "Partially cloudy"
        }]
    }
});
            
var config = {
    method: 'post',
    url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-clape/endpoint/data/v1/action/insertOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': 'QZcQn6106uI6SjhuQgvYmRSsQS6lSm48rdkLBXbTAGUIg0k7CSFTErab9QjmbwF8',
    },
    data: data
};
            
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
