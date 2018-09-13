import React from 'react'
import loginService from '../services/login'

class LoginComponent extends React.Component {

constructor(props) {
  super(props)
  this.state = {
    username: props.user.username,
    password: props.user.password,
    fetchedPassword: props.user.password,
  }
  this.loginHandle = props.loginHandle
}

handleLoginFieldChange = (event) => {
  this.setState({ [event.target.name]: event.target.value })
}

login = async(event) => {
  event.preventDefault()
  const psw = this.state.password ? this.state.password : this.state.fetchedPassword
  console.log('logging in with', this.state.username, psw)
  const user = {'username': this.state.username, 'password': psw}
  const result = await loginService.login(user)
  console.log('setting password', psw);
  result.password =  psw
  this.loginHandle(result)
}

render() {
  return (
    <div>
      <form onSubmit={this.login}>
        <div>
          käyttäjätunnus
          <input
            type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
          />
        </div>
        <div>
          salasana
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleLoginFieldChange}
          />
          <p></p>
        </div>
        <button type="submit">kirjaudu</button>
      </form>
  </div>
  )
}

}


export default LoginComponent
