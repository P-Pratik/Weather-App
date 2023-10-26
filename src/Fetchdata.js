var axios = require('axios');
var data = JSON.stringify({
    "collection": "Weather",
    "database": "MiniPro",
    "dataSource": "Cluster0",
    "filter": {
        "name" : "Mumbai,India"
        },
    "projection" : {
        "name" : 1,
        "days" : 1
    }
});

var config = {
    method: 'post',
    url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-clape/endpoint/data/v1/action/findOne',
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