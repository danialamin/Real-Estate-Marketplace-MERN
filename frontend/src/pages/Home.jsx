import React from 'react'

const Home = () => {
  return (
    <div className='grow flex justify-center items-center'>
      <div className='w-[min(900px,100%)] p-10 flex justify-between max-sm:flex-col'>
        <div className='w-[min(400px,100%)]'>
          <h1 className='text-[3.5rem] text-blue-500 font-[600] mb-[10px] tracking-tighter leading-[3.5rem]'>Find your next perfect place with ease</h1>
          <p className='tracking-tighter'>Easy Estate is the best place to find your next perfect place to live.</p>
          <p className='tracking-tighter'>We have a wide range of properties for you to choose from.</p> 
        </div>
        <div className='w-[350px]'>
          <img src="https://easyestates.net/images/logo.png" alt="" />
        </div>
      </div>
    </div>
  )
}

export default Home
