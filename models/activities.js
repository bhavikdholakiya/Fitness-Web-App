const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const activitySchema=new Schema({
    name:{
        type:String,
        unique:true
    },
    description:{
        type:String
    },
    docter:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    video:{
        type:Buffer,
    },
    point:{
        type:Number
    }
});
module.exports=mongoose.model('activity',activitySchema);