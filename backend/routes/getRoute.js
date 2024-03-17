const express = require('express')
const {getController} = require('../../controllers/getController')

const Router = express.Router()

Router.get('/get', getController)

module.exports = Router