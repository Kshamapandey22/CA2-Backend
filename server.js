const express=require("express");
const mongoose=require("mongoose");
const feedbackRoutes=require("./routes/feedback");
const app=express();
app.use(express.json());
app.use("/api/feedback", feedbackRoutes);
mongoose
  .connect("mongodb://127.0.0.1:27017/student_feedback")
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err)=>{
    console.log("Connection failed");
  });
