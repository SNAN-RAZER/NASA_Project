const mongoose  = require('mongoose');

const launchSchema  = new mongoose.Schema({
    flightNumber:{
        type:Number,
        require: true
    },
    launchDate:{
        type:Date,
        require: true
    },
    mission:{
        type: String,
        require: true
    },
    rocket:{
        type : String,
        require : true
    },
    target:{
        type:String,
        
    },
    upcoming:{
        type:Boolean,
        require: true
    },
    success:{
        type:Boolean,
        require: true,
        default : true
    },
    customers : {
        type:[String]
    }
});

const launchedModel = mongoose.model('launch', launchSchema);

module.exports = launchedModel;


