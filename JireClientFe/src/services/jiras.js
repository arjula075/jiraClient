import axios from 'axios'
const utils = require('../utils/utils.js')
const baseUrl = '/api/jira'
const baseUrlDevLabs = '/api/devlabs'
const baseUrlAsop = '/api/asop'

const authenticate = async(token) => {
  const authString = utils.makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}

  const request = axios.get(baseUrl, head)
  return request.then(response => response.data)
}

const getIssue = async(token, id) => {
  const authString = utils.makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}

  console.log(baseUrl, id,  head)
  try {
    const request = axios.get(baseUrl + `/${id}`, head)
    return request.then(response => response.data)
  }
  catch(error) {
    console.log(error)
  }

}

const getAllDevLabsIssues = async(token) => {
  const authString = utils.makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}

  //console.log(baseUrlDevLabs,  head)
  try {
    const request = axios.get(baseUrlDevLabs + '/', head)
    return request.then(response => response.data)
  }
  catch(error) {
    console.log(error)
  }

}

const getSprintDetails = async(token, id) => {

  console.log('token', token)
  console.log('id', id)
  const authString = utils.makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}

  //console.log(baseUrlDevLabs,  head)
  try {
    const request = axios.get(baseUrlDevLabs + '/sprint' +  `/${id}`, head)
    return request.then(response => response.data)
  }
  catch(error) {
    console.log(error)
  }

}

const getDevLabsIssueChangeLog = async(token, id) => {
  const authString = utils.makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}

  //console.log(baseUrlDevLabs,  head)
  try {
    const request = axios.get(baseUrlDevLabs +  `/${id}`, head)
    return request.then(response => response.data)
  }
  catch(error) {
    console.log(error)
  }

}


const getDevLabsIssue = async(token, id) => {
  const authString = utils.makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}

  //console.log(baseUrlDevLabs,  head)
  try {
    const request = axios.get(baseUrlDevLabs + `/${id}`, head)
    return request.then(response => response.data)
  }
  catch(error) {
    console.log(error)
  }

}

const getAsopIssue = async(token, id) => {
  const authString = utils.makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}

  console.log(baseUrlAsop, id,  head)
  try {
    const request = axios.get(baseUrlAsop + `/${id}`, head)
    return request.then(response => response.data)
  }
  catch(error) {
    console.log(error)
  }

}

const postIssue = async(token, issue) => {
  const authString = utils.makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}

  console.log(baseUrl, issue,  head)
  const request = axios.post(baseUrl, issue,  head)
  return request.then(response => response.data)

}

const writeToFile = async(token, issue) => {
  console.log('issue in caller', issue)
  const authString = utils.makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}


  const request = axios.post(baseUrlDevLabs + '/write2file', issue,  head)
  return request.then(response => response.data)

}



export default {
  authenticate,
  getIssue,
  postIssue,
  getDevLabsIssue,
  getAsopIssue,
  getAllDevLabsIssues,
  getDevLabsIssueChangeLog,
  getSprintDetails,
  writeToFile
}
