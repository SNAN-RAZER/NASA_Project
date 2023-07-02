const launchedModel = require("./launches.mongo");
const planetModel = require("./planets.mongo");
const DEFAULT_FLIGHT_NUMBER = 100;
const launches = new Map();
const axios = require('axios');


let latestFlightNUmber = 100;


const getLatestFlightNumber = async () => {
  const latestLaunch = await launchedModel.findOne({}).sort("-flightNumber");
  if (!latestLaunch) return DEFAULT_FLIGHT_NUMBER;
  else {
    const latestFlightNumber = latestLaunch.flightNumber;
    return latestFlightNumber;
  }
};

const httpGetAllLaunches = async (skip, limit) => {
 
  return await launchedModel.find(
    {},
    {
      __v: 0,
      _id: 0,
    }
  ).skip(skip)
   .limit(limit)
   .sort({flightNUmber: 1})
  
  ;
};

const populateLaunchData = async() =>{
  try {
    const LAUNCHES_API_URL = 'https://api.spacexdata.com/v4/launches/query'
    const response = await axios.post(
      LAUNCHES_API_URL,
      {
        "query": {},
        "options": {
          pagination:false,
            "populate": [
                {
                    "path": "rocket",
                    "select": {
                        "name": 1
                    }
                },
                {
                    "path": "payloads",
                    "select": {
                        "customers": 1
                    }
                }
            ]
        }
    }
    );
    const launchDocs = await response.data.docs;
   
    for( const launchDoc of launchDocs)
    {
      const payloads = launchDoc["payloads"];
      const customers = payloads.flatMap((payload)=>payload["customers"])
      const launch = {
        flightNumber :launchDoc["flight_number"],
        mission : launchDoc["name"],
        rocket : launchDoc['rocket']['name'],
        launchDate: launchDoc['date_local'],
        upcoming: launchDoc["upcoming"],
        success : launchDoc['success'],
        customers
      };

      
     await saveLaunches(launch)

    }


  } catch (error) {
    console.log(error);
  }
}

const getLaunchesData = async () =>{
 try {
  const firstLaunch = await launchedModel.findOne({
    flightNumber: 1,
    rocket :"Falcon 1",
    mission:"FalconSat"
  });

  if(firstLaunch)
  {
    console.log('Launch data already loaded!');
  }
  else{
    await populateLaunchData();
  }

 } catch (error) {
  console.log(error);
 }
}

const saveLaunches = async (launch) => {
  

  try {
   
      const flightNumber = launch.flightNumber;
      const newLaunch = await launchedModel.updateOne(
        {
          flightNumber,
        },
        launch,
        {
          upsert: true,
        }
      );
      return  newLaunch;
    
  } catch (error) {
    console.error(error);
  }
};





const scheduleLaunch = async (launch) => {
  const keplerName = launch.target;
  const planet = await planetModel.findOne({ keplerName });
  if (!planet) {
    throw new Error("No matching planet was found");
  } else {
  const newFlightNUmber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    customer: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
    flightNumber: newFlightNUmber,
  });

  return await saveLaunches(newLaunch);
}
};

// const addNewLaunch = (launch) => {
//   latestFlightNUmber += 1;
//   launches.set(
//     latestFlightNUmber,
//     Object.assign(launch, {
//       flightNumber: latestFlightNUmber,
//       customer: ["ZTM", "NASA"],
//       upcoming: true,
//       success: true,
//       launchDate: new Date(launch.launchDate),
//     })
//   );
//   const data = Array.from(launches.values());
//   return data;
// };

const existsLaunchWithId = async(launchId)=>{
  return await launchedModel.findOne({
    flightNumber:launchId
  })
}

const abortLaunch = async(launchId) => {
  // const abortedLaunchData = launches.get(id);
  // abortedLaunchData.upcoming = false;
  // abortedLaunchData.success = false;
  const abortedLaunchData = await launchedModel.updateOne({
    flightNumber:launchId
  },
  {
    upcoming:false,
    success:false
  })
  
  
  return abortedLaunchData.acknowledged === true && abortedLaunchData.modifiedCount === 1;
};

module.exports = {
  launches,
  httpGetAllLaunches,
  latestFlightNUmber,
  existsLaunchWithId,
  scheduleLaunch,
  saveLaunches,
  abortLaunch,
  getLaunchesData
};
