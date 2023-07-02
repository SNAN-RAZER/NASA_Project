
const {parse} = require('csv-parse');
const fs =require('fs');
const { resourceLimits } = require('worker_threads');
const result = [];
const path = require('path');
const planetModel = require('../models/planets.mongo');
const isHabitable =(planet)=>{
  return planet['koi_disposition'] ==='CONFIRMED' 
  && planet['koi_insol'] > 0.36 
  && planet["koi_insol"] < 1.11 
  && planet['koi_prad']  < 1.6;

  
}

const loadsPlanetData = () =>{
  return new Promise((resolve, reject)=>{
    fs.createReadStream(path.join(__dirname)+'/kepler_data.csv')
    .pipe(parse({
      comment:"#",
      columns:true
    }))
    .on('data', async(data)=>{
      if(isHabitable(data))
      {
       await savePlanet(data)
      }
      
     
    

      
    })
    .on('error',(error)=>{
      console.log(error);
      reject(error);

    })
    .on('end',()=>{
      console.log("done");
      resolve();
    

    })
  });  

    
}

const getAllPlanetsData = async() =>{
  return await planetModel.find({},{
    '_id':0,
    '__v':0,
    'updatedAt':0
  }).sort({keplerName: -1});
}

const savePlanet = async (planet) =>{
  try {
    const keplerName = planet.kepler_name;
    await planetModel.updateOne({keplerName},{keplerName},{upsert: true})
  }
   catch (error) {
    console.log(error)
  }
}
  

module.exports = {
    loadsPlanetData,
    planets:result,
    getAllPlanetsData
}