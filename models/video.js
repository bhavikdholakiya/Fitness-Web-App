const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    file:{
        type:Buffer
    }
})
module.exports = mongoose.model('Video', videoSchema);