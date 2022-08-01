const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const query=new Schema({
    email:{
        type:String
    },
    name:{
        type:String
    },
    message:{
        type:String
    }
})

module.exports=mongoose.model('query',query);