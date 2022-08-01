const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const setName=new Schema({
    name:{
        type:String
    }
})

module.exports=mongoose.model('setName',setName);