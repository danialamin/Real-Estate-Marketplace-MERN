const userModel = require('../models/userModel.js')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const createUserController = async (req, res) => {
  const { username, email, password} = req.body
  const hashed = bcryptjs.hashSync(password, 10)
  try{
    const newUser = new userModel({username, email, password: hashed})
    await newUser.save()
    res.status(200).json("user created successfully")
  } catch(err) {
    res.status(201).json(err)
  }
}

const signin = async (req, res) => {
  const {email, password} = req.body
  try {
    const validUser = await userModel.findOne({ email })
    if (!validUser) return res.status(400).json({message: "User not found!"})
    const validPassword = bcryptjs.compareSync(password, validUser.password)
    if (!validPassword) return res.status(400).json({message: "User not found!"})
    const token = jwt.sign({id: validUser._id}, process.env.SECRET)
    res
      .cookie('jwt', token, {httpOnly: true})
      .status(200)
      .json({message: validUser})
  } catch(err) {
    res.status(400).json({message: "User not found!"})
}}

module.exports = {createUserController, signin}