const express  = require('express');
const { getAllLaunches, addNewLaunches, abortLaunchController } = require('./launches.controller');

const launchesRouter = express.Router();

launchesRouter.get('/',getAllLaunches);
launchesRouter.post('/add-launch', addNewLaunches);
launchesRouter.delete('/abort-launch/:id',abortLaunchController);




module.exports = launchesRouter;
