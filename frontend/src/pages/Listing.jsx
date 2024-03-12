import { Await, defer, useLoaderData } from "react-router-dom"
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'
import { FaLocationDot } from "react-icons/fa6";
import { LiaBedSolid } from "react-icons/lia";
import { FaBath } from "react-icons/fa";
import { FaParking } from "react-icons/fa";
import { GiSofa } from "react-icons/gi";
import { Suspense } from "react"

export const Loader = async ({request, params}) => {
  const pathParam = params
  const res = await fetch(`http://localhost:4000/getListing/${pathParam.id}`)
  const data = res.json()
  return defer({res: data})
}

const Listing = () => {
  const loaderData = useLoaderData()
  return (
    <Suspense fallback={<h1 className="fixed top-[50%] left-[50%] text-[2rem] font-[500]">Loading...</h1>} >
      <Await resolve={loaderData.res}>{(loaderData)=>{
        SwiperCore.use([Navigation])
        return (
        <div className="grow">
          <Swiper navigation>
            {loaderData.message.imageUrls.map(url => 
            <SwiperSlide key={url}>
              <div className="h-[350px]" style={{background: `url(${url}) center no-repeat`, backgroundSize: 'contain'}}></div>
            </SwiperSlide>)}
          </Swiper>
          <div className="w-[100%] flex justify-center items-center">
            <div className="w-[min(500px,100%)] flex flex-col gap-2">
              <h1 className="text-[2.4rem] font-[500] font-serif text-center">{loaderData.message.name}</h1>
              <p className="flex items-center font-[300] text-[0.95rem] gap-2 mx-auto"><FaLocationDot />{loaderData.message.address}</p>
              <div className="text-center flex justify-center gap-2">
                <button className="w-[70px] bg-red-600 text-white font-[500] py-[2px] rounded text-[0.97rem]">For {loaderData.message.type}</button>
                <button className="w-[70px] bg-green-600 text-white font-[500] py-[2px] rounded text-[0.97rem]">For {loaderData.message.discountPrice}$</button>
              </div>
              <p className="text-[0.99rem] tracking-tighter mb-[10px]"><b className="mr-[6px]">Description:</b>{loaderData.message.description}</p>
              <div className="flex flex-wrap gap-3 mx-auto">
                <p className="flex items-center"><LiaBedSolid className="mr-[1px]" />{loaderData.message.bedrooms} bedrooms</p>
                <p className="flex items-center"><FaBath className="mr-[1px]" />{loaderData.message.bathrooms} bathrooms</p>
                {loaderData.message.parking && <p className="flex items-center"><FaParking className="mr-[1px]" /> Parking</p>}
                {loaderData.message.furnished ? <p className="flex items-center"><GiSofa className="mr-[1px]" /> Furnished</p> : <p className="flex items-center"><GiSofa className="mr-[1px]" /> Not furnished</p>}
            </div>
            </div>
          </div>
        </div>)}
      }</Await>
    </Suspense>
  )
}

export default Listing
