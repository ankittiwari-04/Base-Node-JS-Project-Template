const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes'); 

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.listen(3000, () => {
  console.log('Successfully started the server on PORT: 3000');
});
