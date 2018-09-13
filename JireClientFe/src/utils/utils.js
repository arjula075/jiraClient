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

module.exports = {
  getUserFromMemory,
  logOut,
  setUserToMemory,
  displayNone,
  displayNormal
}
