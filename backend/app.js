const express = require('express');
const app = express();
const mongoose = require('mongoose');
const MyBook = require("./models/books");

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/newBook')
  .then(() => console.log("database is connected"))
  .catch((err) => console.log(`error occurred ${err}`));

app.get("/", (req, res) => {
  res.send("books are very good");
});

app.get("/books", async (req, res) => {
  try {
    const books = await MyBook.find();
    res.json(books);
  } catch (err) {
    console.error("Error fetching books:", err);
    res.status(500).json({ message: "Server error while fetching books" });
  }
});
app.get('/books/:id',async(req,res)=>{
  // console.log(`book id is ${req.params.id}`)
  // console.log(req.body.title)
  try{
  const book=await MyBook.findById(req.params.id)
  // .then(d=>res.send(d))
  if(!book)return res.status(404).json({message:"book not found"})
    res.json(book)
  console.log("The book id is",req.params.id)
}catch(error){
  res.status(500).json({message:"Failed to get book"})

}
})
app.put("/books/:id",async(req,res)=>{
  const {title,author,year}=req.body 
  try{
  const updatedBook=  await MyBook.findByIdAndUpdate(
    req.params.id,{title,author,year},
    {new:true}
  )
  if(!updatedBook)return res.status(404).json({message:"book not found"})
  res.json(updatedBook)
  console.log(req.body)
  // console.log(updatedBook)
}catch(error){
  res.status(500).json({message:"Failed to update book"})

}
})
app.post("/books",async(req,res)=>{
    const {title,author,year}=req.body 
    try{
    const newBook=new MyBook({title,author,year})
    await newBook.save()
    res.json(newBook)
    // console.log("new data added")
    }catch(error){
      res.status(500).json({message:"Failed to add book"})
    }
})

app.delete('/books/:id',async(req,res)=>{
  try{
  const deletedbook= await MyBook.findByIdAndDelete(req.params.id)
  if(!deletedbook)return res.status(404).json({message:"Book not found"})
  res.json({message:"Book deleted"})
  }catch(error){
    res.status(500).json({message:"Failed to delete book"})
  }
})

app.listen(5000, () => {
  console.log("Listening on server port 5000"); // ✅ Corrected log
});
