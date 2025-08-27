import React ,{useState}from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'



function List() {
     const[books, setBooks] =  useState([])

    const API_URL="http://localhost:5000/books"
    useEffect(()=>{
        axios.get(API_URL)
          .then(res=>setBooks(res.data))


    },[])
    const handleDelete=async(id)=>{
        // console.log("Delete")
        await axios.delete(`${API_URL}/${id}`)
        setBooks(books.filter((b)=>b._id!==id))

    }
  return (
    // <div> This is my List page</div>
   <table className='table table-dark'>
  <thead>
    <tr>
      <th>Title</th>
      <th>Author</th>
      <th>Year</th>
      <th >Actions</th>
    </tr>
  </thead>
  <tbody>
   {books.map((book,i)=>(
                <tr key={book.id || i}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.year}</td>
                <td> <Link to={`/update/${book._id}`} className='btn btn-warning btn-sm'>edit</Link>
                <button onClick={()=>{
                    handleDelete(book._id)
                }}
                 className='btn btn-danger btn-sm'>delete</button></td>
                </tr>
            ))}

  </tbody>
</table>

  )
}

export default List