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

app.post('/createListing/:id', verifyUser, async(req, res) => {
  if (req.user.id !== req.params.id) {return res.status(404).json({'message': 'user not logged in'})}

  const newListing = new listingModel({...req.body, userRef: req.params.id})
  try{
    await newListing.save()
    res.status(200).json({'message': 'listing created in db'})
  } catch(err) {
    res.status(400).json({'message': 'Please fill all fields'}) // some things were missing in body
  }
})