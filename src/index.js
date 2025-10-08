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

app.listen(serverConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT: ${serverConfig.PORT}`);
    
    // bad code alert
    // const { City, Airport } = require('../models');
    // const bengaluru = await City.findByPk(1, {include: {model: Airport}})
    // console.log(bengaluru);
    // const airport = await Airport.create({ name: 'Kempegowda Airport', code: 'BLR'})
    // const dbairport = await bengaluru.createAirport({name: 'Huballi Airport'})
    // console.log(dbairport);
    // const airportsInBlr = await bengaluru.getAirports();
    // console.log(airportsInBlr);
    // const hbairport = await Airport.findByPk(3);
    // console.log(hbairport);
    // await bengaluru.removeAirports(hbairport);
    // const mumbai = await City.findByPk(2);
    // const sh = await mumbai.createAirport({name: 'CSI airport', code: 'MUM'});
   // await City.destroy({
     //   where: {
       //     id: 2
        //}
 // // });
// // const sh = await Airport.findByPk(2);
// // mumbai.removeAirport(sh)
// // const city = await City.findByPk(4);
// // await city.createAirport({name: 'Indore airport', code: 'IND'});
await City.destroy({
    where: {
        id: 4
    }
});
});