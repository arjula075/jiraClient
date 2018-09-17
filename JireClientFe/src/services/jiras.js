import axios from 'axios'
const utils = require('../utils/utils.js')
const baseUrl = '/api/jira'

const authenticate = async(token) => {
  const authString = utils.makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}

  const request = axios.get(baseUrl, head)
  return request.then(response => response.data)
}

const getIssue = async(token, id) => {
  const authString = utils.makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}

  const request = axios.get(baseUrl + `/${id}`, head)
  return request.then(response => response.data)

}

const postIssue = async(token, issue) => {
  const authString = utils.makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}

  const request = axios.post(baseUrl, issue,  head)
  return request.then(response => response.data)

}



export default {
  authenticate,
  getIssue,
  postIssue,
}
