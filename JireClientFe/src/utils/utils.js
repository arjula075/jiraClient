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
  const issueObject = {}
  // setting stroypoints
  if (lineArray[4] === "") {
    lineArray[4] = 1
  }
  if (lineArray[0] !== "") {
      issueObject.customfield_10010 =  lineArray[0]
      issueObject.summary = lineArray[1]
      issueObject.description = lineArray[2]
      issueObject.issuetype =
        {id: '10000'}
      issueObject.labels = [lineArray[3]]
      issueObject.customfield_10022 = lineArray[4]
  }
  else {
      issueObject.summary = lineArray[1]
      issueObject.description = lineArray[2]
      issueObject.issuetype =
        {id: '10001'}
      issueObject.customfield_10022 = lineArray[4]
      issueObject.labels = [lineArray[3]]
  }
  issueObject.project = {
    key: 'LC',
  }
  return issueObject

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

const createIssueArray = (array) => {
  console.log('Array in beginning of createIssueArray', array);
  const resultArray = []
  let counter = -1
  for (let i=0; i < array.length; i++) {
    if (array[i].issuetype.id === '10000') {
      resultArray.push(array[i])
      counter++
      resultArray[counter].issues = []
    }
    else {
      resultArray[counter].issues.push(array[i])
    }
  }
  console.log('resultArray', resultArray);
  return resultArray
}

const makeAuthString = (token) => {
  let authString = token
  if (token && !token.toLowerCase().startsWith('bearer ')) {
    authString = 'bearer '.concat(token)
  }
  return authString
}

const makeAuthHeader = (token) => {
  let authString = token
  let buff = new Buffer(token)
  let base64data = buff.toString('base64')
  authString = "Basic " + base64data
  return authString
}

module.exports = {
  getUserFromMemory,
  logOut,
  setUserToMemory,
  displayNone,
  displayNormal,
  makeAuthString,
  makeAuthHeader,
  lineToIssue,
  createIssueArray
}
