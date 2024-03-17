const { Schema, model } = require("mongoose");


const schema = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  address: {type: String, required: true},
  regularPrice: {type: Number, required: true},
  discountPrice: {type: Number, required: true},
  bathrooms: {type: Number, required: true},
  bedrooms: {type: Number, required: true},
  furnished: {type: Boolean, required: true},
  parking: {type: Boolean, required: true},
  type: {type: String, required: true},
  offer: {type: Boolean, required: true},
  imageUrls: {type: Array, required: true},
  userRef: {type: String, required: true}
}, {timestamps: true})

const listingModel = model('listing', schema)
module.exports = listingModel