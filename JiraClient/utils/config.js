if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let port = process.env.PORT
let mongoUrl = process.env.MONGO_DB
let jiraUser = process.env.JIRA_USER
let jiraPsw = process.env.JIRA_PSW
let jiraURL = process.env.JIRA_URL
let jiraToken = process.env.JIRA_TOKEN

if (process.env.NODE_ENV === 'test') {
  port = process.env.TEST_PORT
  mongoUrl = process.env.TEST_MONGO_DB
  jiraUser = process.env.TEST_JIRA_USER
  jiraPsw = process.env.TEST_JIRA_PSW
  jiraURL = process.env.TEST_JIRA_URL
  jiraToken = process.env.TEST_JIRA_TOKEN
}

const log = (file, text) => {
  var fs = require('fs');

  var stream = fs.createWriteStream("./" + file + ".txt");
  stream.once('open', function(fd) {
    stream.write(text);
    stream.end();
  })
}


module.exports = {
  mongoUrl,
  port,
  log,
  jiraUser,
  jiraPsw,
  jiraURL,
  jiraToken
}
