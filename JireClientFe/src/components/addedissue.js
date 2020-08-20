import React from 'react'
import AddedTogglable from '../components/addedtoggable'
import SimpleIssue from '../components/simpleIssue'


const AddedIssuesComponent = (props) =>  {

    //console.log('AddedIssuesComponent func', props)
    const addedIssues = props.addedIssues
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
      props.toggleVisibility(props1.issue.id)
    }

    if (addedIssues) {
      console.log('should be something to return', addedIssues)
      return (
        addedIssues.map(issue => {
          return (
            <div key={issue.id} style={blogStyle()} className='blogContainer'>
              <AddedTogglable issue={issue} toggleAddedVisibility={props.toggleAddedVisibility}  buttonLabel ={issue.fields.summary} user = {issue.key} caller = 'addedIssues'>
                <p>{issue.fields.creator.name}</p>
                <p>{issue.fields.summary}</p>
                <SimpleIssue issue={issue} onClick={onClick}/>
              </AddedTogglable>
          </div>
          )
          })
        )
      }
    else {
        return (
          <div>no added issues</div>
          )
    }
}

export default AddedIssuesComponent
