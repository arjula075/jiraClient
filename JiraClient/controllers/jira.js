const jiraRouter = require('express').Router()
const mongoose = require('mongoose')
const utils = require('../utils/utils')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const JiraClient = require('jira-connector')

jiraRouter.get('/', async (request, response) => {
    validCall = utils.isValidCall(request)
    if (validCall.statuscode !== 200) {
      response.status(validCall.statuscode).json(validCall.status)
      return
    }
    console.log('jiraUser', config.jiraUser);
    console.log('jiraPsw', config.jiraPsw);
    const jira = new JiraClient( {
      host: config.jiraURL,
      basic_auth: {
          username: config.jiraUser,
          password: config.jiraPsw
      }
    })
    const issue = jira.issue.getIssue({
      issueKey: 'ANP-1'
    }, function(error, issue) {
      console.log('error', error);
      console.log(issue);
    })
    console.log('issue', issue);
    response.json({savedUser: 'jitatest'})
})

module.exports = jiraRouter
