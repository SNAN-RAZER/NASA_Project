const mongoose = require('mongoose');

const dotenv  =require('dotenv');
dotenv.config();
mongoose.connection.once('open',()=>{
    console.log('MonDb connected');
});
mongoose.connection.on('error',(error)=>{
    console.error(error);
});


const mongoConnect= async() =>{
    await mongoose.connect(process.env.MONGO_URL)
}

const mongoDisconnect = async ()=>{
    await mongoose.disconnect();
}
module.exports= {mongoConnect,mongoDisconnect};
