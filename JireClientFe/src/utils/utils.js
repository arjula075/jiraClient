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

const lineToIssue = (line) => {
  // epic summary description label points
  const lineArray = line.split(';')
  const tempObject = {}
  let issueObject = {}
  let tempFields = {}
  if (lineArray[0] !== "") {
    tempFields = {
      key: 'ANP',
      customfield_10002: lineArray[0],
      summary: lineArray[1],
      description: lineArray[2],
      issuetype:
        {id: 10000},
      labels: lineArray[3],
    }
  }
  else {
    tempFields = {
      key: 'ANP',
      summary: lineArray[1],
      description: lineArray[2],
      issuetype:
        {id: 10100},
      customfield_10117 : lineArray[4],
      labels: lineArray[3],
    }
  }
  tempObject.fields = {}
  tempObject.fields.project = tempFields
  return tempObject

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
  makeAuthString,
  lineToIssue
}
