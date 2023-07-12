const mongoose = require('mongoose');

//mongodb document schema
//anything but this schema will be ignored
const taskSchema = new mongoose.Schema({
    name: {
        type:String,
        //name value is required
        required:[true,"must provide a name"],//we can go with true only
        //delete unnecessary spaces
        trim:true,
        maxlength:[30,"name cannot surpass 30 chars"]
    },
    completed:{
        type:Boolean,
        default:false
    }
})

//instance of model is called document
module.exports = mongoose.model('Task',taskSchema)

