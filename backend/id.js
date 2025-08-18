const express= require('express')
const app=express()
app.use(express.json())
app.get("/",(req,res)=>{
    res.send("Hello world")
})
app.get('/user/:id',(req,res)=>{
    const userId=req.params.id 
    res.send(`User id is ${userId}`)
})
app.post("/data",(req,res)=>{
    const {movie,actor}=req.body
    res.send(`the ${movie} of the ${actor} is too good`)
})
app.get("/data",(req,res)=>{
    const {movie,actor}=req.body
    res.send(`The ${movie} of the ${actor} is too good`)
    console.log(req.body.movie)
})
app.listen(3000,()=>{
    console.log("listening")

})