import React from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) =>  {

  try {
    const blogStyle = () => {
      return {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
      }
    }
      const hideWhenVisible = { display: props.blog.visibility ? 'none' : '' }
      const showWhenVisible = { display: props.blog.visibility ? '' : 'none' }
      const showOwn = {display:  props.blog.user.username == props.user ? '' : 'none'}

      const toggleVisibility = (props1) => {

        props.toggleVisibility(props.blog._id)
      }

      const likePressed = (props1) => {
        props.likePressed(props.blog)
      }

      const deleteBlog = (props1) => {
        if (window.confirm('Do you really want to delete ' + props.blog.title +'?')) {
            props.deleteBlog(props.blog)
        }

      }

      return (
        <div className='blogEntry'>
          <div>
            <span onClick={toggleVisibility}>{props.blog.title} {props.blog.author}</span>
          </div>
          <div style={showWhenVisible}>
            <div style={blogStyle()}>
              {props.children}
              <button onClick={likePressed}>like</button>
              <button  style={showOwn} onClick={deleteBlog}>delete</button>
              <button onClick={toggleVisibility}>cancel</button>

            </div>
          </div>
        </div>
      )
  }
  catch (e) {
    console.log(e);
  }

}

  // toggleVisibility={props.toggleVisibility} likePressed={props.likePressed} buttonLabel ={blog.title} user = {props.user} deleteBlog  = {props.deleteBlog}
  Togglable.propTypes = {
    toggleVisibility : PropTypes.func.isRequired,
    likePressed : PropTypes.func.isRequired,
    buttonLabel : PropTypes.string.isRequired,
    user : PropTypes.string.isRequired,
    deleteBlog : PropTypes.func.isRequired,
  }

export default Togglable
//<button onClick={toggleVisibility}>{props.buttonLabel}</button>
