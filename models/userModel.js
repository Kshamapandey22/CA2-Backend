const mongoose = require("mongoose");
const feedbackSchema = new mongoose.Schema(
  {
    studentName:{
      type: String,
      required: true
    },
    courseName:{
      type: String,
      required: true
    },
    message:{
      type: String,
      required: true
    },
    rating:{
      type:Number,
      required:true,
      
max:5,
      min:1
      
    },
    status:{
      type: String,
      enum:["Pending","Reviewed"],
      default:"Pending"
    }
  },
  {timestamps:true}
);
module.exports=mongoose.model("Feedback",feedbackSchema);
