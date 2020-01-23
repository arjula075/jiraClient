import React from 'react'

class AsopComponent extends React.Component {

constructor(props) {
  console.log('props', props)
  super(props)
  this.state = {
    token: props.token,
  }

  this.devlabsButtonClicked = props.asopButtonClicked
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
          <button type='submit' onClick={this.devlabsButtonClicked}>GET ASOP DATA</button>
        </div>
      </form>
    </div>
  )
}

}
export default AsopComponent
