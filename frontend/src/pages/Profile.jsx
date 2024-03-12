import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import {app} from "../firebase"
import {action} from "../redux/userSlice"

const Profile = () => {  
  const currentUser = useSelector(state => state.user.currentUser)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({})
  const [myListings, setMyListings] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    handleFileUpload(file)    
  }, [file])

  const handleFileUpload = (file) => {
    if (file) {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name // time is concatenated so fileName will be unique
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed',
        (snapshot) => {},
        (error) => {
          setError(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( 
            (downloadURL) => {
            setFormData(prev => { return {...prev, photo: downloadURL}})
          })
        })}
  }
  const handleChange = (e) => {
    setFormData(prev => {return {...prev, [e.target.name]: e.target.value}})
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`http://localhost:4000/api/auth/updateUser/${currentUser._id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.message === 'user not logged in') {
        setError(true)
      } else {
        dispatch(action(data.message))
        setError(false)
      }
    } catch(err) {
      setError(true)
    }
  }
  const handleDelete = async () => {
    const res = await fetch(`http://localhost:4000/api/auth/deleteUser/${currentUser._id}`, {
      method: 'DELETE',
      credentials: 'include'
    })
    const data = await res.json()
    
    if (data.message === 'user not logged in') {
      setError(true)
    } else {
      dispatch(action(null)) // delete currentUser state
      setError(false)
    }
  }
  const handleSignOut = async () => {
    const res = await fetch(`http://localhost:4000/api/auth/signOut/${currentUser._id}`, {
      method: 'GET',
      credentials: 'include'
    })
    const data = await res.json()

    if (data.message === 'user not logged in') {
      setError(true)
    } else {
      dispatch(action(null))
    }
  }
  const handleShowListings = async () => {
    const res = await fetch(`http://localhost:4000/listing/myListing/${currentUser._id}`, {
      method: 'GET',
      credentials: 'include'
    })
    const data = await res.json()
    setMyListings(data.message)
  }
  const handleDeleteListing = async (listingId) => {
    const res = await fetch(`http://localhost:4000/listing/deleteMyListing/${currentUser._id}`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: "include",
      body: JSON.stringify({listingId: listingId})
    })
    const data = await res.json()
    if (data.message == 'listing deleted') {
      setMyListings(prev => prev.filter((listing) => listing._id !== listingId))
    } else {
      console.log('ERR!')
    }
  }
  return (
    <div className="grow flex justify-center items-center">
      <div className="w-[min(100%,500px)]">
        <h1 className="text-center text-[2rem] font-[600]">Profile</h1>
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} ref={fileRef} className="hidden" />
        <div className="flex justify-center">
          <img src={formData.photo || currentUser.photo} alt="profile" onClick={()=> fileRef.current.click()} className="rounded-full w-[125px] h-[125px] cursor-pointer object-cover" />
        </div>

        {error ? <p className="mt-[20px] text-red-600 text-[0.9rem] font-[600] cursor-pointer flex justify-center">Error!</p> : null}

        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder="username" name="username" onChange={e=>handleChange(e)} defaultValue={currentUser.username} className="w-[100%] outline-none mb-[10px] py-1 px-3" />
          <input type="email" placeholder="email" name="email" onChange={e=>handleChange(e)} defaultValue={currentUser.email} className="w-[100%] outline-none mb-[10px] py-1 px-3" />
          <input type="text" placeholder="password" name="password" onChange={e=>handleChange(e)} className="w-[100%] outline-none mb-[10px] py-1 px-3" />
          <button className="w-[100%] px-[8px] py-[6px] bg-blue-800 rounded mb-[10px] text-white font-[500] outline-none">UPDATE</button>
        </form>
        <Link to={'/create-listing'}><button className="w-[100%] px-[8px] py-[6px] bg-green-800 rounded text-white font-[500] mb-[15px] outline-none">CREATE LISTING</button></Link>
        <div className="flex justify-between">
          <p onClick={handleDelete} className="text-red-600 text-[0.9rem] font-[600] cursor-pointer">Delete Account</p>
          <p onClick={handleSignOut} className="text-red-600 text-[0.9rem] font-[600] cursor-pointer">Sign out</p>
        </div>
        <p onClick={handleShowListings} className="mt-[20px] text-green-600 text-[0.9rem] font-[600] cursor-pointer flex justify-center">Show listings</p>
          {myListings.length > 0 && myListings.map((listing, url) => 
            <div key={url} className="border rounded-lg p-3 flex justify-between items-center gap-4">
              <Link to={`/listing/${listing._id}`}>
                <img src={listing.imageUrls[0]} alt="image" className="w-16 h-16 object-contain cursor-pointer"/>
              </Link>
              <Link to={`/listing/${listing._id}`} className="text-slate-700 font-semibold flex-1 cursor-pointer hover:underline truncate">
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col items-center">
                <button onClick={()=>handleDeleteListing(listing._id)} className="text-red-700 text-[0.95rem] font-[500]">DELETE</button>
                <Link to={`/update-listing/${listing._id}`}><button className="text-green-700 text-[0.95rem] font-[500]">EDIT</button></Link>
              </div>
            </div>
          )}
      </div>
    </div>
  )
}

export default Profile
