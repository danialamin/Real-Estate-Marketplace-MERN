const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const authRoute = require('./routes/authRoute')
const bcryptjs = require('bcryptjs')
const userModel = require('./models/userModel')
const verifyUser = require('./utils/verifyUser')
const dotenv = require('dotenv').config()
const cookieParser = require("cookie-parser");
const listingModel = require('./models/listingModel')

const app = express()

app.use(cookieParser())
app.use(cors({origin: true, credentials: true}))
app.use(express.json()) //to parse req.body

mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
  console.log("Connected to mongodb")
  app.listen(4000, () => console.log('listening to port 4000')) // listen to requests only after we're connected to the db
}).catch(err => {
  console.log(err)
})

app.post("/api/user/signup", async (req, res) => {
  const { username, email, password} = req.body
  const hashed = await bcryptjs.hash(password, 10)
  const newUser = new userModel({username, email, password: hashed})
  try{
    await newUser.save()
    res.status(200).json({message: "user created successfully"})
  } catch(err) {
    res.status(500).json({err})
  }
})

app.use("/api/auth", authRoute)


app.post('/updateUser/:id', verifyUser, async (req, res) => {
  if (req.user.id !== req.params.id) {return res.status(400).json({'message': 'user not logged in'})}

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }

    const updatedUser = await userModel.findByIdAndUpdate({_id: req.params.id}, {$set: {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      photo: req.body.photo
    }}, {new: true})

    const {password, ...rest} = updatedUser._doc
    res.status(200).json({'message': rest})
  } catch(err) {
    res.json({'message': 'user not logged in'})
  }
})

app.delete('/deleteUser/:id', verifyUser, async (req, res) => {
  if (req.user.id !== req.params.id) {return res.status(404).json({'message': 'user not logged in'})}

  const deletedUser = await userModel.deleteOne({_id: req.params.id})
  res.status(200)
     .cookie('jwt', '')
     .json({'message': 'deletion successful'})
})

app.get('/signOut/:id', verifyUser, async (req, res) => {
  if (req.user.id !== req.params.id) {return res.status(404).json({'message': 'user not logged in'})}

  res.status(200)
     .cookie('jwt', '')
     .json({'message': 'sign out successful'})
})

app.post('/listing/createListing/:id', verifyUser, async(req, res) => {
  if (req.user.id !== req.params.id) {return res.status(404).json({'message': 'user not logged in'})}

  const newListing = new listingModel({...req.body, userRef: req.params.id})
  try{
    await newListing.save()
    res.status(200).json({'message': newListing})
  } catch(err) {
    res.status(400).json({'message': 'user not logged in'}) // some things were missing in body
  }
})

app.get('/listing/myListing/:id', verifyUser, async (req, res) => {
  if (req.user.id !== req.params.id) {return res.status(404).json({'message': 'user not logged in'})}

  const listings = await listingModel.find({userRef: req.params.id})
  res.status(200).json({'message': listings})
})

app.post('/listing/deleteMyListing/:id', verifyUser, async (req, res) => {
  if (req.user.id !== req.params.id) {return res.status(404).json({'message': 'user not logged in'})}

  const listing = await listingModel.findOne({_id: req.body.listingId})
  if (listing.userRef == req.params.id) {
    const deletedListing = await listingModel.deleteOne({_id: req.body.listingId})
    res.status(200).json({'message': 'listing deleted'})
  } else {
    res.status(404).json({'message': 'you can only delete your own listing'})
  }
})

app.post('/listing/updateMyListing/:id', verifyUser, async (req, res) => {
  if (req.user.id !== req.params.id) {return res.status(404).json({'message': 'user not logged in'})}

  const listing = await listingModel.findOne({_id: req.body.listingId})

  // check if listing's creator and the user who wants to edit the listing are same
  if (req.params.id !== listing.userRef) {res.status(404).json({'message': 'you can only edit your own listing'})}

  const updatedListing = await listingModel.findByIdAndUpdate({_id: req.body.listingId}, req.body.newObject, {new: true})
  res.status(200).json({'message': updatedListing})
})

app.get('/getListing/:id', async (req, res) => {
  const listing = await listingModel.findOne({_id: req.params.id})
  res.status(200).json({'message': listing})
})

app.get('/get', async (req, res) => {
  const limit = parseInt(req.query.limit) || 9
  const startIndex = parseInt(req.query.startIndex) || 0
  
  let offer
  if (req.query.offer === undefined || req.query.offer === 'false') {
    offer = { $in: [true, false] }
  }

  let furnished
  if (req.query.furnished === undefined || req.query.furnished === 'false') {
    furnished = { $in: [true, false] }
  }

  let parking
  if (req.query.parking === undefined || req.query.parking === 'false') {
    parking = { $in: [true, false] }
  }

  let type
  if (req.query.type === undefined || req.query.type === 'all') {
    type = { $in: ['sale', 'rent'] }
  }

  const searchTerm = req.query.searchTerm || ''
  const sort = req.query.sort || 'createdAt'
  const order = req.query.order || 'desc'

  const listings = await listingModel.find({
    name: {$regex: searchTerm, $option: 'i'}, // regex means include those listings that are not an exact match; 'i' means ignore the case of letters i.e. capital/small
    offer: offer,
    furnished: furnished,
    parking: parking,
    type: type
  }).sort({ [sort]: order})
    .limit(limit)
    .skip(startIndex)
  
  return res.status(200).json({'message': listings})
})