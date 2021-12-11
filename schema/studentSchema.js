const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    DOB:{
        type:Date,
        required:true,
    },
    age:{
        type:Number,
        required: true,
    },
    mobileno:{
        type:Number,
        required: true,
    },
    email:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    }
})

const Student = mongoose.model("Student", StudentSchema, "Student");
module.exports = Student;