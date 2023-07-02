import axiosInstance from "../api/api";

async function httpGetPlanets() {
  // TODO: Once API is ready.
  // Load planets and return as JSON.
  try {
    const response =  await axiosInstance.get('/api/v1/planets');
    //console.log(response)
    return await response.data;
  } catch (error) {
    console.log(error);
  }
}

async function httpGetLaunches() {
  // TODO: Once API is ready.
  // Load launches, sort by flight number, and return as JSON.
  const response = await axiosInstance.get('/api/v1/showLa_unches');
  //console.log(response);
  const fetchedLaunches = await response.data;
 
 // console.log(fetchedLaunches)
  const sortedFetchedLaunches  =  fetchedLaunches.sort((a,b)=>{
    return a.flightNumber - b.flightNumber
  });
  return sortedFetchedLaunches;



}

async function httpSubmitLaunch(launch) {
  // TODO: Once API is ready.
  // Submit given launch data to launch system.
  try {
    const response  = await axiosInstance.post("/api/v1/showLa_unches/add-launch",launch);
    const data = await response.data;

    return data;
  } catch (error) {
    console.log(error);
  }
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  console.log(id);
  const response  = await axiosInstance.post(`/api/v1/showLa_unches/abort-launch/${id}`);
  return await response.data;
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};