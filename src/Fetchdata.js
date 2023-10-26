var axios = require('axios');
var data = JSON.stringify({
    "collection": "Weather",
    "database": "MiniPro",
    "dataSource": "Cluster0",
    // "filter": {
    //     },
    "projection" : {
        "name" : 1
    },
    "limit" : 2
});

var config = {
    method: 'post',
    url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-clape/endpoint/data/v1/action/find',
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