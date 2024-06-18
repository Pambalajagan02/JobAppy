import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {userinput: '', userpassword: '', errorvalue: ''}

  onSucessfullEvent = jwttoken => {
    const {history} = this.props
    Cookies.set('jwtToken', jwttoken, {expires: 4})
    history.replace('/')
  }

  onFailureEvnt = error => {
    this.setState({errorvalue: error})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {userinput, userpassword} = this.state
    const userdetails = {username: userinput, password: userpassword}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userdetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSucessfullEvent(data.jwt_token)
    } else {
      this.onFailureEvnt(data.error_msg)
    }
    this.setState({userinput: '', userpassword: ''})
  }

  onChangeUserInput = event => {
    this.setState({userinput: event.target.value})
  }

  onChangeUserpassword = event => {
    this.setState({userpassword: event.target.value})
  }

  render() {
    const {userinput, userpassword, errorvalue} = this.state
    const jwttoken = Cookies.get('jwtToken')
    if (jwttoken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container-1">
        <div className="login-container-2">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="websitelogo"
          />
          <form className="from-container" onSubmit={this.onSubmitLogin}>
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="Username"
              id="username"
              className="inputuser"
              value={userinput}
              onChange={this.onChangeUserInput}
            />
            <label htmlFor="userpass" className="label">
              PASSWORD
            </label>
            <input
              type="password"
              placeholder="Password"
              id="userpass"
              className="inputuser"
              value={userpassword}
              onChange={this.onChangeUserpassword}
            />
            <button type="submit" className="button-login">
              Login
            </button>
            {errorvalue && <p className="error-msg">{errorvalue}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
