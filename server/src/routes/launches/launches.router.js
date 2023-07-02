const express  = require('express');
const { getAllLaunches, addNewLaunches, httpAbortLaunch } = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/',getAllLaunches);
launchesRouter.post('/add-launch', addNewLaunches);
launchesRouter.post('/abort-launch/:id',httpAbortLaunch);




module.exports = launchesRouter;
