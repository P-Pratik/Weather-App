// USELESS FILE 

import ChartsEmbedSDK from '@mongodb-js/charts-embed-dom';


const sdk = new ChartsEmbedSDK({
  baseUrl: 'https://charts.mongodb.com/charts-project-0-ymhhz'
});

const chart1 = sdk.createChart({
  chartId: '65380024-9ea5-43a5-8717-88efd2ebfea4'
});

chart1.render(document.getElementById('chart1'));