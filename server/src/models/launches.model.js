const launches  = new Map();

let latestFlightNUmber = 100;
const launch1 = {
    flightNumber :latestFlightNUmber,
    mission :"Kepler Exploration X",
    rocket: "Explorer IS1",
    launchDate : new Date('December 27, 2030'),
    destination: "Kepler-422 b",
    customer :['ZTM', "NASA"],
    upcoming: true,
    success: true
}
launches.set(launch1.flightNumber, launch1);

const httpGetAllLaunches = () =>{
   return  Array.from(launches.values());
}

const addNewLaunch = (launch) =>{
    latestFlightNUmber += 1;
    launches.set(latestFlightNUmber,Object.assign(launch,{
        flightNumber:latestFlightNUmber,
        customer :['ZTM', "NASA"],
        upcoming: true,
        success: true,
        launchDate : new Date(launch.launchDate),
    }));
    const data = Array.from(launches.values());
    return data;
}

const abortLaunch = (id) =>{
    const abortedLaunchData = launches.get(id);
    abortedLaunchData.upcoming = false;
    abortedLaunchData.success = false;

    return abortedLaunchData;
}

module.exports={
    launches,
    httpGetAllLaunches,
    latestFlightNUmber,
    addNewLaunch,
    abortLaunch
};
