const InputsAndLabels = (props) => {
  return (
    <div className="flex flex-wrap gap-[6px]">
      <div className="flex gap-[3px] items-center">
        <input type="number" name='bedrooms' value={props.formData.bedrooms} onChange={(e)=>props.handleNumberChange(e)} id="beds" required className="outline-none px-2 py-1 border-[0.5px] border-slate-300 rounded w-[70px]" />
        <label htmlFor="beds">Beds</label>
      </div>
      <div className="flex gap-[3px] items-center">
        <input type="number" name='bathrooms' value={props.formData.bathrooms} onChange={(e)=>props.handleNumberChange(e)} id="baths" required className="outline-none px-2 py-1 border-[0.5px] border-slate-300 rounded w-[70px]" />
        <label htmlFor="baths">Baths</label>
      </div>
      <div className="flex gap-[3px] items-center">
        <input type="number" name='regularPrice' value={props.formData.regularPrice} onChange={(e)=>props.handleNumberChange(e)} id="regularPrice" required className="outline-none px-2 py-1 border-[0.5px] border-slate-300 rounded w-[70px]" />
        <label htmlFor="regularPrice">Regular Price</label>
      </div>
      <div className="flex gap-[3px] items-center">
        <input type="number" name='discountPrice' value={props.formData.discountPrice} onChange={(e)=>props.handleNumberChange(e)} id="discountPrice" required className="outline-none px-2 py-1 border-[0.5px] border-slate-300 rounded w-[70px]" />
        <label htmlFor="discountPrice">Discount Price</label>
      </div>
    </div>
  )
}

export default InputsAndLabels