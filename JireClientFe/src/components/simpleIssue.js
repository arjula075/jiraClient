import React from 'react'

const SimpleIssue = ({ issue }) => (
  <div>
    <div className='blogData'>
      {issue.title} {issue.fields.creator.key}
    </div>
    <div className='likeData'>
      <p>{issue.fields.description}</p>
    </div>
  </div>
)

export default SimpleIssue
