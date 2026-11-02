const express=require("express");
const router=express.Router();
const Feedback=require("../models/userModel");

router.post("/",async(req,res)=>{
    const {studentName,courseName,message,rating}=req.body;
    if(!studentName||!courseName||!message||rating===undefined){
        return res.status(400).json({error:"All fields are required"});
    }
    if(rating<1||rating>5){
        return res.status(400).json({error:"Rating must be between 1 and 5"});
    }
    const data=await Feedback.create({studentName,courseName,message,rating});
    res.status(201).json(data);
});
router.get("/",async(req,res)=>{
    const p=parseInt(req.query.page)||1;
    const l=parseInt(req.query.limit)||10;
    const s=(p-1)*l;
    const total=await Feedback.countDocuments();
    const data=await Feedback.find().skip(s).limit(l);
    res.json({page:p,total,data});
});

router.patch("/:id",async(req,res)=>{
    const {status}=req.body;
    const data=await Feedback.findByIdAndUpdate(
        req.params.id,
        {status},
        {new:true,runValidators:true}
    );
    if(!data){
        return res.status(404).json({error:"Feedback not found"});
    }
    res.json(data);
});

module.exports=router;