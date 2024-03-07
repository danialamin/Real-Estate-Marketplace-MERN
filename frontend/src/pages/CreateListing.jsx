import { useState } from "react"
import CheckboxesAndLabels from "../components/CheckboxesAndLabels"
import InputsAndLabels from "../components/InputsAndLabels"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase"

const CreateListing = () => {
  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({imageUrls: []})
  const [imageUploadError, setImageUploadError] = useState(false)
  const [uploading, setUploading] = useState(false)
  const handleImageSubmit = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true)
      setImageUploadError(false)
      const promises = []

      for (let i=0; i<files.length; i++) {
        promises.push(storeImage(files[i]))
      }
      Promise.all(promises).then((urls) => { //waits for all promises to resolves
        setFormData((prev) => {return {...prev, imageUrls: prev.imageUrls.concat(urls) }})
        setImageUploadError(false)
        setUploading(false)
      }).catch((err) => {
        setImageUploadError('Image upload failed (2 mb max per image)')
        setUploading(false)
      })
    } else {
      setImageUploadError('You can only upload 6 images per listing')
      setUploading(false)
    }
  }
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name
      const storageRef = ref(storage, fileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on("state_changed",
        (snapshot) => {},
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL)
          })
        }
      )})
  }
  const handleRemoveImage = (index) => {
    setFormData(prev => {return {...prev, imageUrls: formData.imageUrls.filter((url,i) => i !== index)}})
  }

  return (
    <div className="grow flex justify-center items-center">
      <div className="w-[min(100%,800px)] h-[calc(100vh-78px)] flex flex-col items-center">
        <h1 className="mt-[20px] text-[1.5rem] font-[800]">Create a Listing</h1>

        <form className="flex flex-col items-center w-[100%] md:flex-row md:items-start md:justify-around max-md:gap-[30px] mt-[20px]">
          <div className="flex flex-col gap-[10px] w-[min(100%,370px)]">
            <input type="text" placeholder="Name" className="outline-none px-2 py-1 border-[0.5px] border-slate-300 rounded" />
            <textarea rows={3} placeholder="Description" className="outline-none px-2 py-1 border-[0.5px] border-slate-300 rounded"></textarea>
            <input type="text" placeholder="Address" className="outline-none px-2 py-1 border-[0.5px] border-slate-300 rounded" />
            <CheckboxesAndLabels />
            <InputsAndLabels />
          </div>

          <div className="flex flex-col gap-[5px] w-[min(100%,370px)]">
            <p className="text-[0.9rem]"><b>Images:</b> The first image will be the cover (max 6)</p>
            <div className="flex">
              <input type="file" onChange={e => setFiles(e.target.files)} accept="image/*" multiple className="px-[10px] py-4 border-[0.5px] border-slate-300 mr-[10px] rounded"/>
              <button type='button' onClick={handleImageSubmit} disabled={uploading} className="border-[1px] border-green-500 px-[10px] py-4 rounded">{uploading ? 'Uploading': 'Upload'}</button>
            </div>
            <p className="text-red-600 text-sm">{imageUploadError && imageUploadError}</p>
            {formData.imageUrls.length>0 && formData.imageUrls.map((url, index) =>
              <div className="flex justify-between p-3 border-[1px] items-center">
                <img src={url} alt="image" className="w-20 h-20 object-contain rounded-lg" />
                <button type='button' onClick={()=>{handleRemoveImage(index)}} className="p-3 text-red-700 rounded-lg hover:opacity-75 outline-none">DELETE</button>
              </div>
            )}
            <button className="mt-[20px] bg-cyan-900 text-white py-2 mb-1 rounded font-[600]">CREATE LISTING</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CreateListing