const express = require('express')
const {createUserController, signin, updateUserController, deleteUserController, signOutController} = require('../../controllers/authController')
const verifyUser = require('../api/utils/verifyUser')

const Router = express.Router()

Router.post('/signup', createUserController)
Router.post('/signin', signin)
Router.post('/updateUser/:id', verifyUser, updateUserController)
Router.delete('/deleteUser/:id', verifyUser, deleteUserController)
Router.get('/signOut/:id', verifyUser, signOutController)

module.exports = Router