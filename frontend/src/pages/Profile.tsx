import React, { useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Form } from "react-router-dom"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import {app} from "../firebase"

const Profile: React.FC = () => {  
  const currentUser = useSelector(state => state.user.currentUser)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({})

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
          setFileUploadError(true)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then( 
            (downloadURL) => {
            setFormData({photo: downloadURL})
          })
        }
      )
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
        <Form method="post" replace>
          <input type="text" placeholder="username" name="username" className="w-[100%] outline-none mb-[10px] py-1 px-3" />
          <input type="email" placeholder="email" name="email" className="w-[100%] outline-none mb-[10px] py-1 px-3" />
          <input type="text" placeholder="password" name="password" className="w-[100%] outline-none mb-[10px] py-1 px-3" />
          <button className="w-[100%] px-[8px] py-[6px] bg-blue-800 rounded mb-[10px] text-white font-[500]">UPDATE</button>
        </Form>
        <button className="w-[100%] px-[8px] py-[6px] bg-green-800 rounded text-white font-[500] mb-[15px]">CREATE LISTING</button>
        <div className="flex justify-between">
          <p className="text-red-600 text-[0.9rem] font-[600] cursor-pointer">Delete Account</p>
          <p className="text-red-600 text-[0.9rem] font-[600] cursor-pointer">Sign out</p>
        </div>
        <p className="mt-[20px] text-green-600 text-[0.9rem] font-[600] cursor-pointer flex justify-center">Show listings</p>
      </div>
    </div>
  )
}

export default Profile