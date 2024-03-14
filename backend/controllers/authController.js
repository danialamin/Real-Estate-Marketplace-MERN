const userModel = require('../models/userModel.js')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

const createUserController = async (req, res) => {
  const { username, email, password} = req.body
  const hashed = await bcryptjs.hash(password, 10)
  const newUser = new userModel({username, email, password: hashed})
  try{
    await newUser.save()
    res.status(200).json({message: "user created successfully"})
  } catch(err) {
    res.status(500).json({err})
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
      .cookie('jwt', token, {secure: true, httpOnly: true, sameSite: 'none'})
      .status(200)
      .json({message: validUser})
  } catch(err) {
    res.status(400).json({message: "User not found!"})
}}

const updateUserController = async (req, res) => {
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
}

const deleteUserController = async (req, res) => {
  if (req.user.id !== req.params.id) {return res.status(404).json({'message': 'user not logged in'})}

  const deletedUser = await userModel.deleteOne({_id: req.params.id})
  res.status(200)
     .cookie('jwt', '')
     .json({'message': 'deletion successful'})
}

const signOutController = async (req, res) => {
  if (req.user.id !== req.params.id) {return res.status(404).json({'message': 'user not logged in'})}

  res.status(200)
     .cookie('jwt', '')
     .json({'message': 'sign out successful'})
}

module.exports = {createUserController, signin, updateUserController, deleteUserController, signOutController}