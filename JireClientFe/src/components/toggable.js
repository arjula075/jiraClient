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
      const hideWhenVisible = { display: props.issue.visibility ? 'none' : '' }
      const showWhenVisible = { display: props.issue.visibility ? '' : 'none' }
      //const showOwn = {display:  props.issue.user.username == props.user ? '' : 'none'}

      const toggleVisibility = (props1) => {

        props.toggleVisibility(props.issue.id)
      }

      return (
        <div className='blogEntry'>
          <div>
            <span onClick={toggleVisibility}>{props.issue.key} {props.issue.fields.summary} </span>
          </div>
          <div style={showWhenVisible}>
            <div style={blogStyle()}>
              {props.children}
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
  //  likePressed : PropTypes.func.isRequired,
  //  buttonLabel : PropTypes.string.isRequired,
  //  user : PropTypes.string.isRequired,
  //  deleteBlog : PropTypes.func.isRequired,
  }

export default Togglable
//<button onClick={toggleVisibility}>{props.buttonLabel}</button>
