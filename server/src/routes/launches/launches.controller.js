const { launches, httpGetAllLaunches, abortLaunch, scheduleLaunch, existsLaunchWithId } = require("../../models/launches.model");
const { estimatedDocumentCount } = require("../../models/launches.mongo");
const { getPagination } = require("../../services/query");

const getAllLaunches = async (req, res) => {
 const {skip, limit}= getPagination(req.query);
  return res.status(200).json(await httpGetAllLaunches(skip, limit));
};


const addNewLaunches = async (req,res) =>{
  try {
    return res.status(201).json( await scheduleLaunch(req.body));
  } catch (error) {
   console.error(error.message)
  }
   
}

const httpAbortLaunch= async ( req, res) =>{
  const {id:launchId} = req.params;
  const existsLaunch = await existsLaunchWithId(Number(launchId));

  if(!existsLaunch)
  {
    return res.status(404).json({
      error:'launch not found'
    });

  }

  const aborted =  await abortLaunch(launchId);
  if(!aborted)
  {
    return res.status(500).json({
      error:"launch not aborted"
    })
  }

  return res.status(200).json(aborted);

}

// const abortLaunchController = async (req, res)=>{
//   const {id:launchId} = req.params;
  
//   return res.status(200).json(await httpAbortLaunch(Number(launchId)));
// }

module.exports = {
  getAllLaunches, 
  addNewLaunches,
  
  httpAbortLaunch

};
