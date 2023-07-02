const launchedModel = require("./launches.mongo");
const planetModel = require("./planets.mongo");
const DEFAULT_FLIGHT_NUMBER = 100;
const launches = new Map();

let latestFlightNUmber = 100;
const launch1 = {
  flightNumber: latestFlightNUmber,
  mission: "Kepler Exploration X",
  rocket: "Explorer IS1",
  launchDate: new Date("December 27, 2030"),
  target: "Kepler-62 f",
  customer: ["ZTM", "NASA"],
  upcoming: true,
  success: true,
};
launches.set(launch1.flightNumber, launch1);

const getLatestFlightNumber = async () => {
  const latestLaunch = await launchedModel.findOne({}).sort("-flightNumber");
  if (!latestLaunch) return DEFAULT_FLIGHT_NUMBER;
  else {
    const latestFlightNumber = latestLaunch.flightNumber;
    return latestFlightNumber;
  }
};

const httpGetAllLaunches = async () => {
  return await launchedModel.find(
    {},
    {
      __v: 0,
      _id: 0,
    }
  );
};

const saveLaunches = async (launch) => {
  const keplerName = launch.target;
  const planet = await planetModel.findOne({ keplerName });

  try {
    if (!planet) {
      throw new Error("No matching planet was found");
    } else {
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
    }
  } catch (error) {
    console.error(error);
  }
};

saveLaunches(launch1);

const scheduleLaunch = async (launch) => {
  const newFlightNUmber = (await getLatestFlightNumber()) + 1;
  const newLaunch = Object.assign(launch, {
    customer: ["ZTM", "NASA"],
    upcoming: true,
    success: true,
    flightNumber: newFlightNUmber,
  });

  return await saveLaunches(newLaunch);
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
};
