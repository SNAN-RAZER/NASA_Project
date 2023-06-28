
const http = require('http');
const PORT = process.env.PORT||8001;

const app =require('./app');
const { loadsPlanetData } = require('./models/palnets.model');


const server = http.createServer(app);

(async()=>{await loadsPlanetData()})();
server.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}...`)
})


