import React, { useEffect, useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { Link, NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux";

const Header: React.FC = () => {
  const currentUser: UseSelector = useSelector(state => state.user.currentUser)
  // showSide state determines if sidebar is visible
  const [showSide, setShowSide] = useState(false)
  const [inputVal, setInputVal] = useState()
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm', inputVal)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromURL = urlParams.get('searchTerm')
    if (searchTermFromURL) {
      setInputVal(searchTermFromURL)
    }
  }, [location.search])

  return (
    <header className="bg-slate-300 h-[70px] flex justify-around items-center max-sm:justify-between shadow-md">
        <h1 className="font-bold text-[1.1rem] sm:text-[2rem]  hover:cursor-pointer">
          <span className="text-blue-500">Easy</span>
          <span>Estates</span>
        </h1>

      <form onSubmit={e => handleSubmit(e)} className="w-[max(200px,30%)] h-[45px] flex justify-center items-center rounded bg-white max-sm:h-[30px] max-sm:text-[0.9rem]">
        <input type="text" value={inputVal} onChange={(e)=>setInputVal(e.target.value)} className="w-[90%] h-full outline-none px-2 rounded " placeholder="Search...." />
        <button className="px-[2px] h-full bg-white rounded"><FaSearch /></button>
      </form>

      <div className="sm:hidden cursor-pointer" onClick={() => setShowSide(prev => !prev)}><IoMdMenu size={25} /></div>
      <div className="flex w-[max(150px,15%)] justify-between items-center max-sm:hidden">
        <NavLink to={'/'} className={({isActive}) => isActive ? 'border-b-2 border-blue-600':''}>Home</NavLink>
        <NavLink to={'/about'} className={({isActive}) => isActive ? 'border-b-2 border-blue-600':''}>About</NavLink>
          {/* show profile picture if logged in otherwise show Sign in button */}
        {currentUser ? (
          <Link to={'/profile'}><img src={currentUser.photo} alt="profile" className="rounded-full h-[36px] w-[36px] object-cover cursor-pointer" /></Link>
        ) : (
        <NavLink to={'/sign-in'} className={({isActive}) => isActive ? 'border-b-2 border-blue-600':''}>Sign In</NavLink>)}
      </div>

      <div className={`h-screen w-[max(200px,35%)] fixed top-0 z-10 bg-gradient-to-b from-yellow-200 to-red-300 p-3 ${showSide ? 'right-0' : 'right-[-999px]'} transition-all ease-in-out duration-700`}><MdCancel className="absolute right-2 cursor-pointer" onClick={()=>setShowSide(prev=>!prev)} />
        <NavLink to={'/'} className={({isActive}) => isActive ? 'bg-rose-400 block rounded p-2 mt-6':'block p-2 mt-6 hover:bg-rose-200'}>Home</NavLink>
        <NavLink to={'/about'} className={({isActive}) => isActive ? 'bg-rose-400 block rounded p-2':'block p-2 hover:bg-rose-200'}>About</NavLink>
        {/* Dont show Sign In if user logged in */}
        {currentUser ? 
        <NavLink to={'/profile'} className={({isActive}) => isActive ? 'bg-rose-400 block rounded p-2':'block p-2 hover:bg-rose-200'}>Profile</NavLink> : 
        <NavLink to={'/sign-in'} className={({isActive}) => isActive ? 'bg-rose-400 block rounded p-2':'block p-2 hover:bg-rose-200'}>Sign In</NavLink>}
      </div>
    </header>
  )
}

export default Header