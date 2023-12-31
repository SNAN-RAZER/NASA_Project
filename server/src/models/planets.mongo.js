const mongoose = require('mongoose');

const planetSchema = new mongoose.Schema({
    keplerName:{
        type:String,
        require: true,
        unique: true
    }
},{
    timestamps: true
});


const planetModel = mongoose.model('planet', planetSchema);


module.exports = planetModel;
