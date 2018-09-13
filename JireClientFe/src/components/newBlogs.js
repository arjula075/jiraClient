import React from 'react'

class NewBlogComponent extends React.Component {

constructor(props) {
  super(props)
  this.state = {
    title: '',
    author: '',
    url: '',
    token: props.token,
    counter: props.counter
  }
  this.sendBlog = props.sendBlog
  //console.log('state in newBlogConstructor', this.state);
}

handleLoginFieldChange = (event) => {
  this.setState({ [event.target.name]: event.target.value })
}

createNewBlog = async(event) => {
  event.preventDefault()
  console.log('create new with', this.state.title, this.state.author, this.state.url, this.state.token)
  const blog = {'title': this.state.title, 'author': this.state.author, 'url': this.state.url}
  this.setState({
    title: '',
    author: '',
    url: '',})
  this.sendBlog(blog)
}

render() {
  const noShowStyle = {
    display: 'none'
  }
  return (
    <div>
      <form onSubmit={this.createNewBlog}>
        <div>
          title
          <input
            type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleLoginFieldChange}
              />
        </div>
        <div>
          author
          <input
            type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleLoginFieldChange}
              />
        </div>
        <div>
          url
          <input
            type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleLoginFieldChange}
              />
        </div>
        <button type="submit">create</button>
        <span style={noShowStyle}>{this.state.counter}</span>
      </form>
    </div>
  )
}

}


export default NewBlogComponent
