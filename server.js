const express = require("express")
const mongoose = require("mongoose")
const app = express()
const Movie = require("./models/movieModel")
app.use(express.json())
app.get('/',(req,res)=>{
    res.send("Hello Node API")
})
app.get("/movie/:id",async(req,res)=>{
    try {
        const {id}= req.params;
        const movie= await Movie.findById(id)
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
app.get("/allmovie",async(req,res)=>{
    try {
        const movie = await Movie.find({})
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
app.post('/movies',async(req,res)=>{
    try {
        const movie = await Movie.create(req.body)
        res.status(200).json(movie)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})
app.delete("/movie/:id",async(req,res)=>{
    try {
        const {id}= req.params;
        const movie = await Movie.findByIdAndDelete(id)
        if(!movie){
            return res.status(404).json({message:`we cannot find any movie ${id}`})
        }
        res.status(200).json(movie)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
app.put("/movie/:id",async(req,res)=>{
    try {
        const {id}= req.params;
        const movie = await Movie.findByIdAndUpdate(id,req.body);
        if(!movie){
            return res.status(404).json({message:`we cannot find any movie`})
        }
        const updatedMovie = await Movie.findById(id)
        res.status(200).json(updatedMovie)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
mongoose.connect("mongodb+srv://anshu902956:9653249071@nodeapi.n4uzl01.mongodb.net/Node-API?retryWrites=true&w=majority&appName=NODEAPI").then(()=>{
console.log("Connected to mongoDB")
app.listen(3000,()=>{
    console.log(`Node API app is running on port 3000`)
})
}).catch((error)=>{
    console.log(error)
})
