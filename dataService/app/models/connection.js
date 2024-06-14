const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const connectionSchema = Schema({
    name : { type : String , required : true , unique: true },
    value : { type : Number , required : true },
    ts: { type: String, default: Date.now(), required: true },
} , { timestamps : true , toJson : { virtuals : true } });



module.exports = mongoose.model('Connection' , connectionSchema);