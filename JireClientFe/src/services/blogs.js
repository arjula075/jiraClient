import axios from 'axios'
const baseUrl = '/api/blogs'
const utils = require('../utils/utils.js')

const getAll = async(token) => {
  console.log('token',token)
  const authString = utils.makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}
  console.log('head',head)

  const request = axios.get(baseUrl, head)
  return request.then(response => response.data)
}

const createBlog = async(blog, token) => {
  console.log('token',token)
  const authString = utils.makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}
  console.log('head',head)

  const request = axios.post(baseUrl, blog, head)
  return request.then(response => response.data)
}

const deleteBlog = async(blog, token) => {
  console.log('token',token)
  const authString = utils.makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}
  console.log('head',head)
  const url = baseUrl + '/' + blog._id

  const request = axios.delete(url, head)
  return request.then(response => response.data)
}

const updateBlog = async(blog, token) => {
  console.log('token',token)
  const authString = utils.makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}
  console.log('head',head)

  const request = axios.put(baseUrl + '/' + blog._id, blog, head)
  return request.then(response => response.data)
}

export default {
  getAll,
  createBlog,
  updateBlog,
  deleteBlog,
}
