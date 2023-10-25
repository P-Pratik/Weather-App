var axios = require('axios');
var data = JSON.stringify({
    "collection": "Weather",
    "database": "MiniPro",
    "dataSource": "Cluster0",
    // "projection": {
    //     "_id": 1,
    // },
    "filter": {
        "name" : "Mumbai,India"
        },
    "update": {
        "$set": {
            "days" : [{
                "datetime" : "2023-10-25",
                "tempmax" : 30.8,
                "tempmin" : 20.7,
                "humidity" : 46.4,
                "conditions" : "Partially cloudy"
            },
            {
                "datetime" : "2023-10-26",
                "tempmax" : 30.2,
                "tempmin" : 20.3,
                "humidity" : 41.111,
                "conditions" : "cloudy"
            }
        ]
            }

    },
    "upsert": "true" 
});
            
var config = {
    method: 'post',
    url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-clape/endpoint/data/v1/action/updateOne',
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
