import React from 'react'
import { shallow, mount } from 'enzyme'
import App from '../App'
import Togglable from '../components/toggable'
import SimpleBlog from './simpleBlog'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Blog from '../components/Blog'
import LoginComponent from '../components/login'
import NewBlogComponent from '../components/newBlogs'
const utils = require('../utils/utils.js')


// setting up test data
utils.logOut()

const auxiliaryFunc = (data) => {
  console.log('auxiliaryFunc ', data);
}

const testUser = {
  name: 'test',
  username: 'test',
  password: 'token'
}

const initialBlogs = [
	{
		"title": "Ari's first blog",
		"author": "Ari Lahti",
		"url": "https://jotain.jossain",
		"likes": 1,
    "user" : {
      "username": "test"
    }
	},
	{
		"title": "And now to something completely different",
		"author": "John Cleese",
		"url": "https://muuta.muualla",
		"likes": 2,
    "user" : {
      "username": "test"
    }
	}
]

const props4Blog = {
  blogs: initialBlogs,
  toggleVisibility: auxiliaryFunc,
  likePressed: auxiliaryFunc,
  userName: testUser.username,
  deleteBlog: auxiliaryFunc,
}


describe('<SimpleBlog />', () => {
  test('renders content', () => {
    const blog =	{
    		"title": "Ari's first blog",
    		"author": "Ari Lahti",
    		"url": "https://jotain.jossain",
    		"likes": 2,
        "user" : {
          "username": "test"
        }
    	}

    const onClick = () => {
      console.log('OnClick test func')
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={onClick}/>)
    const blogDiv = blogComponent.find('.blogData')
    const likeDiv = blogComponent.find('.likeData')

    expect(blogDiv.text()).toContain(blog.title)
    expect(blogDiv.text()).toContain(blog.author)
    expect(likeDiv.text()).toContain(blog.likes)
  })
  test('presses button', () => {
    const blog =	{
        "title": "Ari's first blog",
        "author": "Ari Lahti",
        "url": "https://jotain.jossain",
        "likes": 2
      }

    const mockHandler = jest.fn()

    let counter = 0
    const onClick = () => {
      console.log('OnClick test func')
      counter = counter + 1
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={onClick}/>)
    const button = blogComponent.find('button')
    const iter = 2
    for (let i = 0; i < iter; i++) {
      button.simulate('click')
    }


    expect(counter).toBe(iter)
  })
})

describe('<App /> empty to beging with', async() => {
  // yae, found a bug with tests!

  let blogCont
  let app
  beforeAll(() => {
      blogCont = mount(<Blog blogs={props4Blog.blogs} toggleVisibility={props4Blog.toggleVisibility} likePressed={props4Blog.likePressed} user = {props4Blog.userName} deleteBlog  = {props4Blog.deleteBlog}/>)
      app = mount(<App />)
    })

  test('first we check that we do get some blogs with hard coded data', () => {
    //console.log('props4Blog', props4Blog);
    //let app = mount(<App />)
    //app.update()
    //console.log('app, after update', app.html())
    //const contentDiv = app.find('.blogEntry')
    //console.log('contentDiv, after update', contentDiv.debug())

    const blogComponents = blogCont.find(Togglable)
    expect(blogComponents.length).toEqual(initialBlogs.length)
    })

    test('then we check that when logged out, we get nada', () => {
      const blogComponents = app.find(Togglable)
      expect(blogComponents.length).toEqual(0)
      app.unmount()
    })
  })
  describe('<App /> person in memory', async() => {
    let app
    beforeAll(() => {
        utils.setUserToMemory(testUser)
        console.log(utils.getUserFromMemory())
        app = mount(<App />)
      })

    test('then we check that when logged in, we do get stuff', async() => {
      app.update()
      console.log(app.html());
      const blogComponents = app.find(Togglable)
      expect(blogComponents.length).toEqual(initialBlogs.length)
    })

})
