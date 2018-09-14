const getUserFromMemory = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        return user
  }
  else {
    return null
  }
}

const setUserToMemory = (user) => {
  console.log('setting user to memory', user);
  window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
}


const logOut = () => {
   window.localStorage.removeItem('loggedBlogAppUser')
   window.location.reload()
}

const displayNone = () => {
  return {
    display: 'none'
  }
}

const displayNormal = () => {
  return {
    display: ''
  }
}

const makeAuthString = (token) => {
  let authString = token
  if (token && !token.toLowerCase().startsWith('bearer ')) {
    authString = 'bearer '.concat(token)
  }
  return authString

}

module.exports = {
  getUserFromMemory,
  logOut,
  setUserToMemory,
  displayNone,
  displayNormal,
  makeAuthString
}
