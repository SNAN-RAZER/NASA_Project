
const {parse} = require('csv-parse');
const fs =require('fs');
const { resourceLimits } = require('worker_threads');
const result = [];
const path = require('path');
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
    .on('data',(data)=>{
      if(isHabitable(data))
      result.push(data);
      
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



module.exports = {
    loadsPlanetData,
    planets:result
}