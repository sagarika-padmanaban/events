const express = require("express");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const event = require('./schema.js')
const app = express();
app.use(bodyparser.json());
const uri = `mongodb+srv://sagarika:sagarika@cluster0.kheg0xq.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri).then(()=>{
    console.log("connected to mongo");
})


app.post('/POST/v1/events',async (req,res)=>{
    try {
        const {title,description,location,starttime,endtime}= req.body
        const user = await event.create({
            title,
            description,
            location,
            starttime,
            endtime
        })
        console.log(user);
        return(
            res.status(201).json({
                status:"success",
                message:"succesfully added"
            })
        )
    } catch (error) {
        return(
            res.status(400).json({
                status:"success",
                message:error.message
            })
        )
    }
})



app.put('/PUT/v1/events/:id',async (req,res)=>{
    try {
        const {title,description,location,starttime,endtime}= req.body
        const user = await event.findOne({_id:req.params.id})
        if(req.body){
            user.title=title,
            user.description=description,
            user.location=location,
            user.starttime=new Date(),
            user.endtime=new Date()
        }
        await user.save()
        return(
            res.status(201).json({
                status:"success",
                message:"succesfully updated",
                user
            })
        )
    } catch (error) {
        return(
            res.status(400).json({
                status:"success",
                message:error.message
            })
        )
    }
})


app.get("/GET/v1/events",async(req,res)=>{

    const user = await event.find();
    return(
        res.status(201).json({
            status:"success",
            user
        })
    )
})

app.get("/GET/v1/events/:id",async(req,res)=>{
    const user = await event.findOne({_id:req.params.id});
    if(user){
        return(
            res.status(201).json({
                status:"success",
                user
            })
        )
    }
    else{
        return(
            res.status(400).json({
                status:"success",
                message:"There is no event with that id"
            })
        )
    }
})



app.delete("/DELETE/v1/events/:id",async(req,res)=>{
    const user = await event.deleteOne({_id:req.params.id});
        return(
            res.status(201).json({
                status:"success",
                message:"successfully deleted"
            })
        )

})






app.listen(5002,()=>{
    console.log("server is up");
})