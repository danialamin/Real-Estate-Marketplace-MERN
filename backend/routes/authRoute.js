const express = require('express')
const {createUserController, signin} = require('../controllers/authController')

const Router = express.Router()

Router.post('/signup', createUserController)
Router.post('/signin', signin)

module.exports = Router