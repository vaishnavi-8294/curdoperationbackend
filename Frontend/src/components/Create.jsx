import {useState}from 'react'
import axios from 'axios'
import {Navigate, useNavigate}from 'react-router-dom'


function Create() {
    const[formData,setFormData]=useState({
        title:"",
        author:"",
        year:""
    })
    const API_URL="http://localhost:5000/books"
    const navigate=useNavigate()
    const handleSubmit=async(e)=>{
        e.preventDefault()
        await axios.post(API_URL,formData)
        navigate("/")
    }
  return (
    <div className='card p-3 shadow'>
        <h3>Add New Book</h3>
        <form onSubmit={handleSubmit}>
       Title: <input type="text" className='form-control mb-2'value={formData.title} onChange={e=>setFormData({...formData,title:e.target.value})} placeholder='Enter title' required/> <br/>
        Author:<input type="text" className='form-control mb-2'value={formData.author} onChange={e=>setFormData({...formData,author:e.target.value})} placeholder='Enter Author' required/> <br/>
       Year: <input type="text" className='form-control mb-2'value={formData.year}onChange={e=>setFormData({...formData,year:e.target.value})} placeholder='Enter Year' required/> <br/>
        <button className='btn btn-primary'>Add</button>
        </form>
    </div>
  )
}

export default Create