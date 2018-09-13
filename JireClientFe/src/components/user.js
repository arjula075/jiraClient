import React from 'react'
const utils = require('../utils/utils.js')

const UserComponent = (props) => {

    let loggedInUser = {}
    if (props.user) {
        loggedInUser = props.user
    }
    else {
        loggedInUser = null
    }

    if (loggedInUser) {
    return (
      <div>
        {loggedInUser.username} {loggedInUser.name}
        <button onClick={logOut}>
          kirjaudu ulos
        </button>
      </div>
    )
  }
  else {
    return (
      <div>
        no user
      </div>
      )
    }

}

const logOut = () => {
  console.log('in logout');
  utils.logOut()
}

export default UserComponent
