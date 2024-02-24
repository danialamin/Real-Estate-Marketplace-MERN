import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [showSide, setShowSide] = useState(false)

  return (
    <header className="bg-slate-300 h-[70px] flex justify-around items-center max-sm:justify-between">
      <h1 className="font-bold text-[1.1rem] sm:text-[2rem]  hover:cursor-pointer">
        <span className="text-blue-500">Easy</span>
        <span>Estates</span>
      </h1>

      <form className="w-[max(200px,30%)] h-[45px] flex justify-center items-center rounded bg-white max-sm:h-[30px] max-sm:text-[0.9rem]">
        <input type="text" className="w-[90%] h-full outline-none px-2 rounded " placeholder="Search...." />
        <button className="px-[2px] h-full bg-white rounded"><FaSearch /></button>
      </form>

      <div className="sm:hidden cursor-pointer" onClick={() => setShowSide(prev => !prev)}><IoMdMenu size={25} /></div>
      <div className="flex w-[max(150px,15%)] justify-between max-sm:hidden">
        <NavLink to={'/'} className={({isActive}) => isActive ? 'border-b-2 border-blue-600':''}>Home</NavLink>
        <NavLink to={'/about'} className={({isActive}) => isActive ? 'border-b-2 border-blue-600':''}>About</NavLink>
        <NavLink to={'/sign-in'} className={({isActive}) => isActive ? 'border-b-2 border-blue-600':''}>Sign In</NavLink>
      </div>

      <div className={`h-screen w-[max(200px,35%)] fixed top-0 z-10 bg-gradient-to-b from-yellow-200 to-red-300 p-3 ${showSide ? 'right-0' : 'right-[-999px]'} transition-all ease-in-out duration-700`}><MdCancel className="absolute right-2 cursor-pointer" onClick={()=>setShowSide(prev=>!prev)} />
        <NavLink to={'/'} className={({isActive}) => isActive ? 'bg-rose-400 block rounded p-2 mt-6':'block p-2 mt-6 hover:bg-rose-200'}>Home</NavLink>
        <NavLink to={'/about'} className={({isActive}) => isActive ? 'bg-rose-400 block rounded p-2':'block p-2 hover:bg-rose-200'}>About</NavLink>
        <NavLink to={'/sign-in'} className={({isActive}) => isActive ? 'bg-rose-400 block rounded p-2':'block p-2 hover:bg-rose-200'}>Sign In</NavLink>
      </div>
    </header>
  )
}

export default Header