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
  this.devlabsButtonClicked = props.devlabsButtonClicked
  this.devlabsButtonClicked = this.devlabsButtonClicked.bind(this)
  this.saveAddedStoriesButtonClicked = props.saveAddedStoriesButtonClicked
  this.saveAddedStoriesButtonClicked = this.saveAddedStoriesButtonClicked.bind(this)
  this.buttonClicked = this.buttonClicked.bind(this)
  this.handleFileFieldChange = this.handleFileFieldChange.bind(this)
  this.addedStoriesButtonClicked = props.addedStoriesButtonClicked
  this.addedStoriesButtonClicked = this.addedStoriesButtonClicked.bind(this)
}

handleFileFieldChange = (e) => {
  console.log('file', e.target.files);
  this.setState({ myfile: e.target.files[0] })
}

buttonClicked = (e) => {
  console.log('in jirclient token',  this.state.token);
  this.jiraButtonClicked(e, this.state.myfile, this.state.token)
}



render() {
  const noShowStyle = {
    display: 'none'
  }
  return (
    <div>
      <form>
        <div>
          Select a file: <input
          type='file'
          onChange={this.handleFileFieldChange}/>
          <button type='submit' onClick={this.buttonClicked}>UPLOAD FILE</button>
        </div>
        <div>
          <button type='submit' onClick={this.devlabsButtonClicked}>GET SPRINT DATA</button>
        </div>
        <div>
          <button type='submit' onClick={this.addedStoriesButtonClicked}>GET ADDED STORIES</button>
        </div>
        <div>
          <button type='submit' onClick={this.saveAddedStoriesButtonClicked}>SAVE ADDED STORIES</button>
        </div>

      </form>
    </div>
  )
}

}
export default JiraComponent
