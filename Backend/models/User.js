const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName : {type:String,},
    email : String,
    password : String
})

const user = mongoose.model("user", userSchema);

module.exports = user;