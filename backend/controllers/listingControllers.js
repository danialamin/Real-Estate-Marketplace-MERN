const listingModel = require('../models/listingModel.js')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()
const bcryptjs = require('bcryptjs')

const createListingController = async(req, res) => {
  if (req.user.id !== req.params.id) {return res.status(404).json({'message': 'user not logged in'})}

  const newListing = new listingModel({...req.body, userRef: req.params.id})
  try{
    await newListing.save()
    res.status(200).json({'message': newListing})
  } catch(err) {
    res.status(400).json({'message': 'user not logged in'}) // some things were missing in body
  }
}

const getListingController = async (req, res) => {
  // if (req.user.id !== req.params.id) {return res.status(404).json({'message': 'user not logged in'})}

  const listings = await listingModel.find({userRef: req.params.id})
  res.status(200).json({'message': listings})
}

const deleteListingController = async (req, res) => {
  if (req.user.id !== req.params.id) {return res.status(404).json({'message': 'user not logged in'})}

  const listing = await listingModel.findOne({_id: req.body.listingId})
  if (listing.userRef == req.params.id) {
    const deletedListing = await listingModel.deleteOne({_id: req.body.listingId})
    res.status(200).json({'message': 'listing deleted'})
  } else {
    res.status(404).json({'message': 'you can only delete your own listing'})
  }
}

const updateMyListingController = async (req, res) => {
  if (req.user.id !== req.params.id) {return res.status(404).json({'message': 'user not logged in'})}

  const listing = await listingModel.findOne({_id: req.body.listingId})

  // check if listing's creator and the user who wants to edit the listing are same
  if (req.params.id !== listing.userRef) {res.status(404).json({'message': 'you can only edit your own listing'})}

  const updatedListing = await listingModel.findByIdAndUpdate({_id: req.body.listingId}, req.body.newObject, {new: true})
  res.status(200).json({'message': updatedListing})
}

const getOneListingController = async (req, res) => {
  const listing = await listingModel.findOne({_id: req.params.id})
  res.status(200).json({'message': listing})
}

module.exports = {createListingController, getListingController, deleteListingController, updateMyListingController, getOneListingController}