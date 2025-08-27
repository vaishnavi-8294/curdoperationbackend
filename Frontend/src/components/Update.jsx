import {useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {Navigate, useNavigate}from 'react-router-dom'

function Update() {
     const navigate=useNavigate()
    const {id}=useParams()
    const API_URL="http://localhost:5000/books"
    const[formData,setFormData]=useState({
        title:"",
        author:"",
        year:""
    })
    useEffect(()=>{
        axios.get(`${API_URL}/${id}`)
        .then((res)=>setFormData(res.data))
    },[id])
    const handleSubmit=async(e)=>{
        e.preventDefault()
        await axios.put(`${API_URL}/${id}`,formData)
        navigate("/")


    }
  return (
       <div className='card p-3 shadow'>
        <h3>Update Book</h3>
        <form onSubmit={handleSubmit}>
       Title: <input type="text" className='form-control mb-2'value={formData.title} onChange={e=>setFormData({...formData,title:e.target.value})} placeholder='Enter title' required/> <br/>
        Author:<input type="text" className='form-control mb-2'value={formData.author} onChange={e=>setFormData({...formData,author:e.target.value})} placeholder='Enter Author' required/> <br/>
       Year: <input type="text" className='form-control mb-2'value={formData.year}onChange={e=>setFormData({...formData,year:e.target.value})} placeholder='Enter Year' required/> <br/>
        <button className='btn btn-warning'>Update</button>
        </form>
    </div>
  )
}

export default Update