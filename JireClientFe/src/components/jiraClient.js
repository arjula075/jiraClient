import React from 'react'

class JiraComponent extends React.Component {

constructor(props) {
  super(props)
  this.state = {
    token: props.token,
  }

  this.jiraButtonClicked = this.jiraButtonClicked.bind(this)
}

jiraButtonClicked = (e) => {
  e.preventDefault()
  console.log('jira button clicked');
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
