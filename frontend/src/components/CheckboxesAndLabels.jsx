const CheckboxesAndLabels = (props) => {
  return (
    <div className="flex flex-wrap gap-[6px]">
      <div className="flex gap-[3px]">
        <input type="radio" name="type" checked={props.formData.type=='sell'} onChange={(e)=>props.handleRadioboxChange(e)} id="sell" className="w-[16px]" />
        <label htmlFor="sell" className="text-[0.95rem]">Sell</label>
      </div>
      <div className="flex gap-[3px]">
        <input type="radio" name="type" checked={props.formData.type=='rent'} onChange={(e)=>props.handleRadioboxChange(e)} id="rent" className="w-[16px]" />
        <label htmlFor="rent" className="text-[0.95rem]">Rent</label>
      </div>
      <div className="flex gap-[3px]">
        <input type="checkbox" name="parking" value={props.formData.parking} onChange={(e) => props.handleCheckboxChange(e)} id="parkingSpot" className="w-[16px]" />
        <label htmlFor="parkingSpot" className="text-[0.95rem]">Parking Spot</label>
      </div>
      <div className="flex gap-[3px]">
        <input type="checkbox" name="furnished" value={props.formData.furnished} onChange={(e) => props.handleCheckboxChange(e)} id="furnished" className="w-[16px]" />
        <label htmlFor="furnished" className="text-[0.95rem]">Furnished</label>
      </div>
      <div className="flex gap-[3px]">
        <input type="checkbox" name="offer" value={props.formData.offer} onChange={(e) => props.handleCheckboxChange(e)} id="offer" className="w-[16px]" />
        <label htmlFor="offer" className="text-[0.95rem]">Offer</label>
      </div>
    </div>
  )
}

export default CheckboxesAndLabels
