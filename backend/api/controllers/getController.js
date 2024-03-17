const listingModel = require('../models/listingModel.js')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const getController = async (req, res) => {
  const searchTerm = req.query.searchTerm || ''

  const listings = await listingModel.find({
    name: {$regex: searchTerm, $options: 'i'}, // regex means include those listings that are not an exact match; 'i' means ignore the case of letters i.e. capital/small
  })  
  return res.status(200).json({'message': listings})
}

module.exports = {getController}