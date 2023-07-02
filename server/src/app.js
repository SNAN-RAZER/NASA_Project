const express = require('express');

const app = express()
const cors = require('cors');
const path = require('path');
const planetsRouter = require('./routes/planets/planets.router');
const launchesRouter = require('./routes/launches/launches.router');
app.use(cors({
    origin:"http://localhost:3000"
}));
app.use(express.json());

// console.log(path.join(__dirname, '..',"..","client","build"));
// app.use(express.static(path.join(__dirname, '..',"..","client","build")));
// app.get('/', function (req, res) {

//   res.sendFile( 'index.html',{root:"public"});
// });
 app.use(express.static(path.join(__dirname, '..',"public")));
app.get('/', function (req, res) {

  res.sendFile( 'index.html',{root:"public"});
});
app.use('/api/v1/planets',cors(),planetsRouter);
app.use('/api/v1/showLa_unches',cors(), launchesRouter)


module.exports = app;
