const loginUser = {
  token: 'token',
  username: 'test',
  name: 'test',
  password: 'token'
}

const login = () => {
  return Promise.resolve(loginUser)
}

export default { login }
