
const http = require('http');
const dotenv  =require('dotenv');
dotenv.config();
const PORT = process.env.PORT||8001;
const app =require('./app');
const { loadsPlanetData, getAllPlanetsData } = require('./models/palnets.model');
const { error } = require('console');
const { mongoConnect } = require('./services/mongo');
const { getLaunchesData } = require('./models/launches.model');
const MongoUrl = ``

const server = http.createServer(app);



(async()=>{
    
    await mongoConnect()
    // if( (await getAllPlanetsData()).length === 0 )
        await loadsPlanetData();
        await getLaunchesData();


})();
server.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}...`)
})


