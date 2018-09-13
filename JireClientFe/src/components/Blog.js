import React from 'react'
import Togglable from '../components/toggable'
import SimpleBlog from '../components/simpleBlog'


const Blog = (props) =>  {

    const blogs = props.blogs
    const label = 'Näytä tiedot'

    const blogStyle = () => {
      return {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }
    }

    const onClick = () => {
      console.log('onClick')
    }

    const toggleVisibility = (props1) => {
      console.log('toggleVisibility func', props)
      props.toggleVisibility(props1.blog._id)
    }

    if (blogs) {
      return (
        blogs.map(blog => {

          return (
            <div key={blog._id} style={blogStyle()} className='blogContainer'>
              <Togglable blog={blog} toggleVisibility={props.toggleVisibility} likePressed={props.likePressed} buttonLabel ={blog.title} user = {props.user} deleteBlog  = {props.deleteBlog}>
                <p>{blog.author}</p>
                <p>{blog.title}</p>
                <p>{blog.url}</p>
                <p>{blog.likes}</p>
                <SimpleBlog blog={blog} onClick={onClick}/>
            </Togglable>
          </div>
          )
          })
        )
      }
    else {
        return (
          <div></div>
          )
    }
}

export default Blog
