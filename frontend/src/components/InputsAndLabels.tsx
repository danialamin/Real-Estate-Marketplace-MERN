const InputsAndLabels = () => {
  return (
    <div className="flex flex-wrap gap-[6px]">
      <div className="flex gap-[3px] items-center">
        <input type="number" id="beds" defaultValue={0} className="outline-none px-2 py-1 border-[0.5px] border-slate-300 rounded w-[70px]" />
        <label htmlFor="beds">Beds</label>
      </div>
      <div className="flex gap-[3px] items-center">
        <input type="number" id="baths" defaultValue={0} className="outline-none px-2 py-1 border-[0.5px] border-slate-300 rounded w-[70px]" />
        <label htmlFor="baths">Baths</label>
      </div>
      <div className="flex gap-[3px] items-center">
        <input type="number" id="regularPrice" defaultValue={0} className="outline-none px-2 py-1 border-[0.5px] border-slate-300 rounded w-[70px]" />
        <label htmlFor="regularPrice">Regular Price</label>
      </div>
    </div>
  )
}

export default InputsAndLabels