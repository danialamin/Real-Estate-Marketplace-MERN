import { Await, Link, defer, useLoaderData } from "react-router-dom"

export const searchLoader = async ({request, params}) => {
  const url = new URL(request.url)
  const searchParams = url.searchParams
  const res = await fetch(`https://real-estate-marketplace-mern-server-nu.vercel.app/get/get?searchTerm=${searchParams.get("searchTerm")}`, {
    headers: {"Access-Control-Allow-Origin": true}
  })
  const data = res.json()

  return defer({data: data})
}

const Search = () => {
  const loaderData = useLoaderData()
  return (
    <Await resolve={loaderData.data}>{(data) => {
      const arr = data.message
      return (
      <div className="grow flex flex-col justify-center items-start">
        <h1 className="mx-auto text-[2rem]">Listing Results</h1>
        <div className="w-[100%] mt-[20px] px-2 flex flex-wrap gap-2">
          {arr.length > 0 ? arr.map(obj =>
            <Link to={`/listing/${obj._id}`} key={obj._id} className="w-[min(300px,100%)]">
              <div className="flex flex-col bg-slate-200 py-1 px-2 rounded-lg cursor-pointer">
                <img src={obj.imageUrls} alt="image" height={200} />
                <p className="truncate mb-[7px] text-[1.2rem]">{obj.name}</p>
                <p className="h-[80px] truncate whitespace-normal text-[0.9rem]">{obj.description}</p>
                <p className="text-slate-600 mt-[7px]">Price: {obj.discountPrice}</p>
              </div>
            </Link>
          ) : <h1 className="mx-auto text-[1.2rem]">No results found</h1>}
        </div>
      </div>)
    }}

    </Await>
  )
}

export default Search
