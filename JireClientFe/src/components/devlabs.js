import React from 'react'

class DevLabsComponent extends React.Component {

constructor(props) {
  console.log('props', props)
  super(props)
  this.state = {
    token: props.token,
  }

  this.devlabsButtonClicked = props.devlabsButtonClicked
  this.devlabsButtonClicked = this.devlabsButtonClicked.bind(this)

}


render() {
  const noShowStyle = {
    display: 'none'
  }
  return (
    <div>
      <form>
        <div>
          <button type='submit' onClick={this.devlabsButtonClicked}>GET DEVLABS DATA</button>
        </div>
      </form>
    </div>
  )
}

}
export default DevLabsComponent
