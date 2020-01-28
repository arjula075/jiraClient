import React from 'react'
import Togglable from '../components/toggable'
import SimpleIssue from '../components/simpleIssue'


const IssueComponent = (props) =>  {

    const issues = props.issues
    const label = 'Näytä tiedot'
    console.log('props in issuecomp', props)

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

    if (issues) {
      return (
        issues.map(issue => {

          return (
            <div key={issue.id} style={blogStyle()} className='blogContainer'>
              <Togglable issue={issue} toggleVisibility={props.toggleVisibility}  buttonLabel ={issue.fields.summary} user = {issue.key}>
                <p>{issue.fields.creator.name}</p>
                <p>{issue.fields.summary}</p>
                <SimpleIssue issue={issue} onClick={onClick}/>
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

export default IssueComponent
