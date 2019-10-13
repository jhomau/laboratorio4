const mongoose = require('./connect');
var USERSCHEMA = {
    name        : String,
    email       : String,
    password    : String,
    registerdate: Date,
    sex         : String,
    address     : String 
};
const USER = mongoose.model("user",USERSCHEMA);
module.exports = USER;