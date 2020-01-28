const axios = require ('axios')

const devlabsRouter = require('express').Router()
const mongoose = require('mongoose')
const utils = require('../utils/utils')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const JiraClient = require('jira-connector')


devlabsRouter.get('/:id', async (request, response) => {

  //validCall = utils.isValidCall(request)
  //if (validCall.statuscode !== 200) {
  //  response.status(validCall.statuscode).json(validCall.status)
  //  return
  //}

  const jira = new JiraClient( {
    protocol: 'https',
    strictSSL: false,
    host: config.jiraDevLabsUrl,
    port: '8443',
    apiVersion: '2',
    basic_auth: {
        username: config.jiraDevLabsUser.trim(),
        password: config.jiraDevLabsPsw.trim()
    }
  })
  const issue = await jira.issue.getChangelog({
    issueKey: request.params.id
  }, function(error, issue) {
    console.log('error in changeLog function', error);
    console.log('changeLog function', issue);
  })
  //console.log('issue in changeLog', issue);
  response.json({issue: issue})

})

devlabsRouter.get('/', async (request, response) => {

    //
    console.log('devlabs without id');
    //validCall = utils.isValidCall(request)
    //if (validCall.statuscode !== 200) {
    //  response.status(validCall.statuscode).json(validCall.status)
    //  return
    //}

    let jql_string = 'project = HRTS AND fixVersion !~ "Kieku*" ORDER BY lastViewed DESC'
    const jira = new JiraClient( {
      protocol: 'https',
      strictSSL: false,
      host: config.jiraDevLabsUrl,
      port: '8443',
      apiVersion: '2',
      basic_auth: {
          username: config.jiraDevLabsUser.trim(),
          password: config.jiraDevLabsPsw.trim()
      }
    })
    //console.log('JiraClient:', jira)

    const issue = await jira.search.search({
      jql: jql_string,
      maxResults: 100
      },
      function(error, issue) {
        //console.log('error issue', error, issue);
      response.json({issue: issue})
    })

    //const issue = await jira.issue.getIssue({
    //  issueKey: request.params.id
    //  },
    //  function(error, issue) {
    //  console.log('error issue', error, issue);
    //  response.json({issue: issue})
    //})
})

devlabsRouter.post('/', async (request, response) => {
  // validating own call
  validCall = utils.isValidCall(request)
  if (validCall.statuscode !== 200) {
    response.status(validCall.statuscode).json(validCall.status)
    console.log('not valid call');
    return
  }
  // trying with direct call
  const result = await jiraCreateCalls(request.body)
  //const result = await jiraDeleteAll(request.body)
  //const result = await jiraGetIssue(request.body)
  response.status(200).json(result)
})

const jiraDeleteAll = async(array) => {

  const jira = new JiraClient( {
    host: config.jiraURL,
    basic_auth: {
        base64: utils.createJiraToken()
    }
  })

  for (let i = 2; i < 43; i++) {
    const iss = 'LC-' + i
    jira.issue.deleteIssue({
      issueKey: iss
    },
    function (error, issue) {
      tmpObject = issue
      console.log(issue);
      console.log(error);
    })

  }


}

const jiraGetIssue = async(id) => {
  const jira = new JiraClient( {
    host: config.jiraURL,
    basic_auth: {
        base64: utils.createJiraToken()
    }
  })
  const issue = jira.issue.getIssue({
    issueKey: 'LC-8'
  }, function(error, issue) {
    //console.log('error', error);
    console.log(issue);
  })
}

const jiraCreateCalls = async(array) => {

  const jira = new JiraClient( {
    host: config.jiraURL,
    basic_auth: {
        base64: utils.createJiraToken()
    }
  })
  try {
    for (let i = 0; i < array.length; i++) {
      const tmpObject = JSON.parse(JSON.stringify(array[i]))
      tmpObject.issues = undefined
      const epicResult = await createIssue(tmpObject, array[i], jira)
    }
    return 'OK'
  }
  catch (e) {
    console.log(e);
    return 'NOK'
  }
}

const createIssue = async(issue2, issue3, jira) => {
  let tmpObject = {}
  tmpObject.fields = issue2
  const test = await jira.issue.createIssue({
    fields: issue2
  },
  function (error, issue) {
    tmpObject = issue
    console.log('issue',issue);
    console.log(error);
    for (let j = 0; j < issue3.issues.length; j++) {
      issue3.issues[j].customfield_10013 = issue.key
      console.log('issue2.issues[j]', issue3.issues[j]);
      const result2 = createIssue(issue3.issues[j], jira)
      const test = jira.issue.createIssue({
        fields: issue3.issues[j]
      },
      function (error, issue) {
        console.log(issue);
      })
    }
  })
  return tmpObject.id

}

module.exports = devlabsRouter
