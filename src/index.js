const express = require('express');
const { serverConfig } = require('./config'); // fixed capitalization
const apiRoutes = require('./routes');
const { City, Airport } = require('./models'); // use ./ instead of ../
 // require models at the top

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// index.js > app.listen callback
app.use('/api', apiRoutes);

app.listen(serverConfig.PORT,  () => {
    console.log(`Successfully started the server on PORT: ${serverConfig.PORT}`);
  
});