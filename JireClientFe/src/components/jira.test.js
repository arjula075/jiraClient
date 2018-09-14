import React from 'react'
import { shallow, mount } from 'enzyme'
import App from '../App'
import loginService from '../services/login'
import LoginComponent from '../components/login'
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


describe('<App /> empty to beging with', async() => {
  // yae, found a bug with tests!

  let app
  beforeAll(() => {
      app = mount(<App />)
    })

    test('then we check that when logged out, we get nada', () => {
      //const blogComponents = app.find(Togglable)
      //expect(blogComponents.length).toEqual(0)
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
      //const blogComponents = app.find(Togglable)
      //expect(blogComponents.length).toEqual(initialBlogs.length)
    })

})
