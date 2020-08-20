import React from 'react'
import PropTypes from 'prop-types'

const AddedTogglable = (props) =>  {
  //console.log('props in addedtoggable', props)

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

      const toggleAddedVisibility = (props1) => {
        props.toggleAddedVisibility(props.issue.id)
      }

      return (
        <div className='blogEntry'>
          <div>
            <span onClick={toggleAddedVisibility}>{props.issue.key} {props.issue.fields.summary} </span>
          </div>
          <div style={showWhenVisible}>
            <div style={blogStyle()}>
              {props.children}
              <button onClick={toggleAddedVisibility}>cancel</button>
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
  AddedTogglable.propTypes = {
    toggleVisibility : PropTypes.func.isRequired,
  //  likePressed : PropTypes.func.isRequired,
  //  buttonLabel : PropTypes.string.isRequired,
  //  user : PropTypes.string.isRequired,
  //  deleteBlog : PropTypes.func.isRequired,
  }

export default AddedTogglable
//<button onClick={toggleVisibility}>{props.buttonLabel}</button>
