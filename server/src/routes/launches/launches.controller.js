const { launches, httpGetAllLaunches, addNewLaunch, abortLaunch } = require("../../models/launches.model");

const getAllLaunches = (req, res) => {
  return res.status(200).json(httpGetAllLaunches());
};


const addNewLaunches = (req,res) =>{
   return res.status(201).json(addNewLaunch(req.body));
}

const abortLaunchController = (req, res)=>{
  const id = +req.params.id;
  return res.status(200).json(abortLaunch(id));
}

module.exports = {
  getAllLaunches, 
  addNewLaunches,
  abortLaunchController

};
