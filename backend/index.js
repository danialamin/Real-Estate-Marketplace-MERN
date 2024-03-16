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
const listingRoute = require('./routes/listingRoutes')
const getRoute = require('./routes/getRoute')

const app = express()
module.exports = app

app.use(cookieParser())
app.use(cors({origin:true, credentials:true}))
app.use(express.json()) //to parse req.body

mongoose.connect(process.env.CONNECTION_STRING)
.then(() => {
  console.log("Connected to mongodb")
  app.listen(4000, () => console.log('listening to port 4000')) // listen to requests only after we're connected to the db
}).catch(err => {
  console.log(err)
})

app.use("/api/auth", authRoute)
app.use("/listing", listingRoute)
app.use("/get", getRoute)

app.get('/getListing/:id', async (req, res) => {
  const listing = await listingModel.findOne({_id: req.params.id})
  res.status(200).json({'message': listing})
})