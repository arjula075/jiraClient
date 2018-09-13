const jiraRouter = require('express').Router()
const mongoose = require('mongoose')
const utils = require('../utils/utils')
const jwt = require('jsonwebtoken')

jiraRouter.get('/', async (request, response) => {
    validCall = utils.isValidCall(request)
    if (validCall.statuscode !== 200) {
      response.status(validCall.statuscode).json(validCall.status)
      return
    }
    const blogs = {user: 'testForJIRA'}
    response.json(blogs)
})

module.exports = jiraRouter
