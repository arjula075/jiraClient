import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async(token) => {
  console.log('token',token)
  const authString = makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}
  console.log('head',head)

  const request = axios.get(baseUrl, head)
  return request.then(response => response.data)
}

const createBlog = async(blog, token) => {
  console.log('token',token)
  const authString = makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}
  console.log('head',head)

  const request = axios.post(baseUrl, blog, head)
  return request.then(response => response.data)
}

const deleteBlog = async(blog, token) => {
  console.log('token',token)
  const authString = makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}
  console.log('head',head)
  const url = baseUrl + '/' + blog._id

  const request = axios.delete(url, head)
  return request.then(response => response.data)
}

const updateBlog = async(blog, token) => {
  console.log('token',token)
  const authString = makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}
  console.log('head',head)

  const request = axios.put(baseUrl + '/' + blog._id, blog, head)
  return request.then(response => response.data)
}


const makeAuthString = (token) => {
  let authString = token
  if (token && !token.toLowerCase().startsWith('bearer ')) {
    authString = 'bearer '.concat(token)
  }
  return authString

}

export default {
  getAll,
  createBlog,
  updateBlog,
  deleteBlog,
}
