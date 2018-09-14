import React from 'react'
import jiraService from '../services/jiras'

class JiraComponent extends React.Component {

constructor(props) {
  super(props)
  this.state = {
    token: props.token,
  }

  this.jiraButtonClicked = this.jiraButtonClicked.bind(this)
}

jiraButtonClicked = async(e) => {
  e.preventDefault()
  console.log('jira button clicked');
  jiraService.authenticate(this.state.token)
  await jiraService.authenticate(this.state.token)
}



render() {
  const noShowStyle = {
    display: 'none'
  }
  return (
    <div>
      <form>
        <button type='button' onClick={this.jiraButtonClicked}>JIRA</button>
      </form>
    </div>
  )
}

}
export default JiraComponent
