import React from 'react'

class JiraComponent extends React.Component {

constructor(props) {
  console.log('props', props)
  super(props)
  this.state = {
    token: props.token,
  }
  this.jiraButtonClicked = props.jiraButtonClicked
  this.jiraButtonClicked = this.jiraButtonClicked.bind(this)
  this.buttonClicked = this.buttonClicked.bind(this)
  this.handleFileFieldChange = this.handleFileFieldChange.bind(this)
}

handleFileFieldChange = (e) => {
  console.log('file', e.target.files);
  this.setState({ myfile: e.target.files[0] })
}

buttonClicked = (e) => {
  console.log('myfile', this.state.myfile)
  console.log('typeof myfile', typeof this.state.myfile)
  this.jiraButtonClicked(e, this.state.myfile)
}



render() {
  const noShowStyle = {
    display: 'none'
  }
  return (
    <div>
      <form>
        <button type='submit' onClick={this.buttonClicked}>JIRA</button>
        Select a file: <input
          type='file'
          onChange={this.handleFileFieldChange}/>

      </form>
    </div>
  )
}

}
export default JiraComponent
