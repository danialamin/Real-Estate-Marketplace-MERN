const express = require('express')
const verifyUser = require('../utils/verifyUser')
const {createListingController, getListingController, deleteListingController, updateMyListingController, getOneListingController} = require('../controllers/listingControllers')

const Router = express.Router()

Router.post('/createListing/:id', verifyUser, createListingController)
Router.get('/myListing/:id', verifyUser, getListingController)
Router.post('/deleteMyListing/:id', verifyUser, deleteListingController)
Router.post('/updateMyListing/:id', verifyUser, updateMyListingController)
Router.get('/getListing/:id', getOneListingController)

module.exports = Router