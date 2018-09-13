// No, 5.5 tulikin tehtyä heti kärkeen

import React from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginComponent from './components/login'
import UserComponent from './components/user'
import NewBlogComponent from './components/newBlogs'
import loginService from './services/login'
const utils = require('./utils/utils.js')

class App extends React.Component {
  constructor(props) {

    try {
      super(props)
      const cachedUser = utils.getUserFromMemory()
      console.log('cachedUser', cachedUser);
      this.state = {
          blogs: [],
          username: '',
          password: '',
          user: cachedUser,
          hideWhenLoggedIn: utils.displayNormal(),
          showWhenLoggedIn: utils.displayNone(),
          token: null,
          counter: 0,
          fetchedPassword: cachedUser ? cachedUser.password : null,
        }
      this.handleLoginResult = this.handleLoginResult.bind(this)
      this.sendBlog = this.sendBlog.bind(this)
      this.setNotification = this.setNotification.bind(this)
      this.clearmessages = this.clearmessages.bind(this)
      this.successFullPost = this.successFullPost.bind(this)
      this.loginFromCache = this.loginFromCache.bind(this)
      this.toggleVisibility = this.toggleVisibility.bind(this)
      this.likePressed = this.likePressed.bind(this)
      this.deleteBlog = this.deleteBlog.bind(this)
    }
    catch (e) {
      console.log(e);
    }

  }

  toggleVisibility = (id) => {
    console.log('id is vis', id)
    const pivotBlogs = this.state.blogs
    const index = pivotBlogs.findIndex(blog => blog._id == id)
    if (index > -1) {
      pivotBlogs[index].visibility =  !pivotBlogs[index].visibility
    }
    this.setState({
      blogs: pivotBlogs
    })
  }

  likePressed = async(blog) => {
    console.log('like pressed', blog)
    blog.visibility = undefined
    blog.likes = blog.likes + 1
    await blogService.updateBlog(blog, this.state.token)
    await this.successFullPost()
    this.toggleVisibility(blog._id)
    this.setNotification('Yeah, new like')
  }

  deleteBlog = async(blog) => {
    console.log('delete blog in app', blog)
    await blogService.deleteBlog(blog, this.state.token)
    this.setNotification('blog ' + blog.title + ' was deleted')
    this.successFullPost()

  }

  componentDidMount = async() => {
    if (this.state.user) {
      await this.loginFromCache(this.state.user)
      const  blogs = await blogService.getAll(this.state.token)
      blogs.sort((a, b) => b.likes - a.likes)
      for (let i = 0; i < blogs.length; i++) {
        blogs[i].visibility = false
      }
      this.setState({ blogs })
    }
  }

  loginFromCache = async(cachedUser) => {
    try {
      const result = await loginService.login(cachedUser)
      this.handleLoginResult(result)
      this.setNotification('kirjautuminen onnistui')
    }
    catch(e) {
      this.setNotification('NA', 'kirjautuminen epäonnistui')
    }
    const result = await loginService.login(cachedUser)
    this.handleLoginResult(result)
  }

  successFullPost = async() => {
    let blogs = await blogService.getAll(this.state.token)
    blogs.sort((a, b) => b.likes - a.likes)
    for (let i = 0; i < blogs.length; i++) {
      blogs[i].visibility = false
    }
    this.setState({ blogs })
  }

  sendBlog = async(blog) => {
    const result = await blogService.createBlog(blog, this.state.token)
    try {
      let newBlogs = await blogService.getAll(this.state.token)
      newBlogs.sort((a, b) => b.likes - a.likes)
      for (let i = 0; i < newBlogs.length; i++) {
        newBlogs[i].visibility = false
      }
      this.setState({blogs: newBlogs})
      this.setNotification('Good job')
    }
    catch (e) {
      console.log(e)
      this.setNotification('NA', 'failed')
    }
  }

  clearmessages() {
  this.setState({
    successtext: null,
    errortext: null
  })
}

  handleLoginResult = async(result) => {
    console.log('do we get here in tests?');
    try {
      let loggedInUser = null
      if (result.token) {
        loggedInUser = {
          name: result.name,
          username: result.username,
          password: result.password
        }
        utils.setUserToMemory(loggedInUser)

      }
      else {
        return
      }

      let blogs = await blogService.getAll(result.token)
      blogs.sort((a, b) => b.likes - a.likes)
      for (let i = 0; i < blogs.length; i++) {
        blogs[i].visibility = false
      }

      this.setState({
          hideWhenLoggedIn: utils.displayNone(),
          showWhenLoggedIn: utils.displayNormal(),
          user: loggedInUser,
          username: '',
          password: '',
          token: 'bearer ' + result.token,
          blogs: blogs,
          counter: this.state.counter + 1,
        })
    }
    catch (e) {
      console.log(e);
    }

  }

  setNotification = (notification, error) => {
    if (!error) {
    this.setState({
  					successtext: notification
  				})

  				setTimeout(() => {
  					this.clearmessages()
  				}, 3000)
  	}
  	else {
  				console.log(error)
  				this.setState({
  					errortext: error
  				})
  				setTimeout(() => {
  					this.clearmessages()
  				}, 3000)
  		}
  }

  render() {

    try {
      //console.log('this.state in render', this.state);
      let user = {'username': this.state.username, 'password': this.state.password}
      let userName = undefined
      if (this.state.user) {
        userName = this.state.user.username
      }

      return (
      <div>
        <Notification message={this.state.successtext} error={this.state.errortext} />
        <div style={this.state.hideWhenLoggedIn}>
          <LoginComponent user={user} loginHandle = {this.handleLoginResult}/>
        </div >
        <div  style={this.state.showWhenLoggedIn}>
          <UserComponent user={this.state.user} />
        </div>
        <div>
          <h2>blogs</h2>
              <Blog blogs={this.state.blogs} toggleVisibility={this.toggleVisibility} likePressed={this.likePressed} user = {userName} deleteBlog  = {this.deleteBlog}/>
        </div>
        <div style={this.state.showWhenLoggedIn}>
          <NewBlogComponent token={this.state.token} counter={this.state.counter} sendBlog={this.sendBlog}/>
        </div>
      </div>
      )
    }
    catch (e) {
      console.log(e)


    }
  }
}

const Notification = ({ message, error }) => {
  if (message === null && error === null) {
    return null
  }
  else if (message === null) {
	  return (
		<div className="error">
		  {error}
		</div>
	  )
  }
  else {
	return (
		<div className="note">
		  {message}
		</div>
	  )
  }
}

export default App;
