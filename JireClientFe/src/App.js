// No, 5.5 tulikin tehtyä heti kärkeen

import React from 'react'
import LoginComponent from './components/login'
import loginService from './services/login'
import JiraComponent from './components/jiraClient'
import UserComponent from './components/user'
import DevLabsComponent from './components/devlabs'
import IssueComponent from './components/issue'
import AddedIssuesComponent from './components/addedissue'
import jiraService from './services/jiras'
const utils = require('./utils/utils.js')

class App extends React.Component {
  constructor(props) {

    try {
      super(props)
      const cachedUser = utils.getUserFromMemory()
      console.log('cachedUser', cachedUser);
      this.state = {
          username: '',
          password: '',
          user: cachedUser,
          hideWhenLoggedIn: utils.displayNormal(),
          showWhenLoggedIn: utils.displayNone(),
          token: null,
          counter: 0,
          issues: null,
          fetchedPassword: cachedUser ? cachedUser.password : null,
          issues: null,
          addedIssues: null,
          addedPivotIssues: null,
        }
      this.handleLoginResult = this.handleLoginResult.bind(this)
      this.setNotification = this.setNotification.bind(this)
      this.clearmessages = this.clearmessages.bind(this)
      this.loginFromCache = this.loginFromCache.bind(this)
      this.toggleVisibility = this.toggleVisibility.bind(this)
      this.jiraButtonClicked = this.jiraButtonClicked.bind(this)
      this.devlabsButtonClicked = this.devlabsButtonClicked.bind(this)
      this.getChangeLog = this.getChangeLog.bind(this)
      this.getActiveSprint = this.getActiveSprint.bind(this)
      this.addedStoriesButtonClicked = this.addedStoriesButtonClicked.bind(this)
      this.toggleAddedVisibility = this.toggleAddedVisibility.bind(this)
      this.saveAddedStoriesButtonClicked = this.saveAddedStoriesButtonClicked.bind(this)
    }
    catch (e) {
      console.log(e);
    }

  }

saveAddedStoriesButtonClicked = async(evt, myFile, token) => {

  try {
    evt.preventDefault()
    this.state.addedIssues.map(item => {
    console.log('added issue', item)
    let strResult = ""
    strResult = strResult.concat(item.key)
    if (item.fields.labels.length > 0) {
      item.fields.labels.map(label => {
        strResult.concat("; ")
        strResult.concat(item.key)
      })
    }
    console.log('str', strResult);
    const payLoad = {string: strResult}
    jiraService.writeToFile(this.state.token, payLoad)
  })
}
catch (err) {
  console.log(err)
}

}

jiraButtonClicked = async(evt, myFile, token) => {
    console.log('in jbc token', token);
    console.log('in jbc token', this.state.token);
    evt.preventDefault()

    var reader = new FileReader();
    reader.token = this.state.token

    reader.onload = (function(f) {
        return function(e) {
          console.log('in onload', this.token);
          const lineArray = e.target.result.split('¤¤')
          const resultArray = []
          lineArray.map(line => {
            //console.log(this);
            resultArray.push(utils.lineToIssue(line))
          })
          const resultObjectArray = utils.createIssueArray(resultArray)
          const result = jiraService.postIssue(this.token, resultObjectArray)
          console.log('result', result);
        };
    })(myFile);

    reader.readAsText(myFile);

    //await jiraService.authenticate(this.state.token)
    const issue = await jiraService.getIssue(this.state.token, 'LC-4')
    console.log('issue', issue);
  }

  devlabsButtonClicked = async(evt, myFile, token) => {
      evt.preventDefault()

      //await jiraService.authenticate(this.state.token)
      const issue = await jiraService.getAllDevLabsIssues(this.state.token)
      this.setState({issues: issue.issue.issues})

    }

  addedStoriesButtonClicked = async(evt, myFile, token) => {
      evt.preventDefault()
      // get change history
      // first, get first items changes and we should get the latest sprint from there
      let sprints = await this.getActiveSprint(this.state.issues[0].key)
      console.log('sprints', sprints)
      // when we have sprint, we can get the sprint details
      const oneSprint = await jiraService.getSprintDetails(this.state.token, sprints[0].sprint)


      // when we have sprint details, we can then check from that sprint if the stories have been added after startDate
      this.state.addedIssues = []

      console.log('added issues should be empty', this.state.addedIssues)
      this.state.issues.map(issue => {
        const isAddedLater = this.getAddedStoriesToSprint(issue, oneSprint)
      })
      //console.log('added issues', this.state.addedIssues)
      const adIs = this.state.addedIssues
      console.log('added issues adis', adIs)


      this.setState({addedPivotIssues: adIs})

    }

    getAddedStoriesToSprint = async(issue, oneSprint) => {
      //console.log('oneSprint', oneSprint)
      const changeLog = await jiraService.getDevLabsIssueChangeLog(this.state.token, issue.key)

      changeLog.issue.values.map(item => {
          item.items.map(change => {
            //console.log('change.field', change.field)
            //console.log('change.to', change.to)
            //console.log('item.created', item.created )
            //console.log('oneSprint.startDate', oneSprint.startDate)
            if (change.field === 'Sprint') {
              try {
                if (parseInt(change.to) === oneSprint.issue.id) {
                  if (item.created > oneSprint.issue.startDate) {
                    this.state.addedIssues.push(issue)
                    return true
                  }
                }
              }
              catch (e) {
                console.log('not number')
              }

            }
            //console.log('same sprint', (change.field === 'Sprint' && change.to === oneSprint.issue.id))
            //if (change.field === 'Sprint' && change.to === oneSprint.issue.id) {
              //if (item.created > oneSprint.startDate) {
                //console.log('return true')
                //return true
      })
    })
      return false

    }

    getChangeLog = async(id) => {
      const changeLog = await jiraService.getDevLabsIssueChangeLog(this.state.token, id)
      return changeLog

    }

    getActiveSprint = async(id) => {
      let sprints = []
      console.log('changeLog id', id)
      let changeLog = await this.getChangeLog(id)
      console.log('changeLog', changeLog)
      changeLog.issue.values.map(change => {
        change.items.map(item => {
            if (item.field == 'Sprint') {
              const sprintDetails = new Object()
              sprintDetails.sprint = item.to
              sprintDetails.sprintString = item.toString
              sprints.push(sprintDetails)

            }
          })
        })

        sprints.sort(utils.compareSprints)
        console.log('sprints', sprints)
        return sprints
      //console.log("changeLog values", changeLog.issue.values);

    }

    toggleAddedVisibility = (id) => {
      // first for issues

      // then for added
      let pivotIssues = this.state.addedIssues
      const index = pivotIssues.findIndex(blog => blog.id == id)
      if (index > -1) {
        if (typeof pivotIssues[index].visibility == 'undefined') {
          pivotIssues[index].visibility = false
        }
        pivotIssues[index].visibility =  !pivotIssues[index].visibility
      }
      this.setState({
        addedIssues: pivotIssues,
      })


    }

  toggleVisibility = (id) => {
    // first for issues

    // then for added
    let pivotIssues = this.state.issues
    const index = pivotIssues.findIndex(blog => blog.id == id)
    if (index > -1) {
      if (typeof pivotIssues[index].visibility == 'undefined') {
        pivotIssues[index].visibility = false
      }
      pivotIssues[index].visibility =  !pivotIssues[index].visibility
    }
    this.setState({
      issues: pivotIssues,
    })


  }

  componentDidMount = async() => {
    if (this.state.user) {
      await this.loginFromCache(this.state.user)
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

      this.setState({
          hideWhenLoggedIn: utils.displayNone(),
          showWhenLoggedIn: utils.displayNormal(),
          user: loggedInUser,
          username: '',
          password: '',
          token: 'bearer ' + result.token,
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
      console.log('this.state in render', this.state);
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
        <div style={this.state.showWhenLoggedIn}>
            <JiraComponent jiraButtonClicked={this.jiraButtonClicked} dataButtonClicked={this.dataButtonClicked} devlabsButtonClicked={this.devlabsButtonClicked} addedStoriesButtonClicked={this.addedStoriesButtonClicked} saveAddedStoriesButtonClicked = {this.saveAddedStoriesButtonClicked} />
        </div>
        <div style={this.state.hideWhenLoggedIn}>
          <DevLabsComponent devlabsButtonClicked={this.devlabsButtonClicked}/>
        </div >
        <div><hr /> ADDED ISSUES</div>
        <div style={this.state.showWhenLoggedIn}>
          <AddedIssuesComponent addedIssues={this.state.addedPivotIssues} toggleAddedVisibility={this.toggleAddedVisibility}/>
        </div >
        <div><hr />SPRINT ISSUES</div>
        <div style={this.state.showWhenLoggedIn}>
          <IssueComponent issues={this.state.issues} toggleVisibility={this.toggleVisibility}/>
        </div >
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
