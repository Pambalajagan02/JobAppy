import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

const switchprofilestatus = {
  intial: 'Intial',
  inProgress: 'Inprogress',
  failure: 'Failure',
  sucess: 'Sucess',
}
class Profile extends Component {
  state = {profileStatus: switchprofilestatus.intial, profileobj: {}}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({profileStatus: switchprofilestatus.inProgress})
    console.log('jagan')
    const getcookie = Cookies.get('jwtToken')
    const options = {
      headers: {
        Authorization: `Bearer ${getcookie}`,
      },
      method: 'GET',
    }
    const url = 'https://apis.ccbp.in/profile'
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const updatedobj = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileStatus: switchprofilestatus.sucess,
        profileobj: updatedobj,
      })
    } else {
      this.setState({profileStatus: switchprofilestatus.failure})
    }
  }

  renderProfileComponent = () => {
    const {profileStatus} = this.state
    switch (profileStatus) {
      case switchprofilestatus.inProgress:
        return this.inProgressFunc()
      case switchprofilestatus.failure:
        return this.failureFunction()
      case switchprofilestatus.sucess:
        return this.sucessFunction()
      default:
        return null
    }
  }

  onClickRetry = () => {
    this.getProfile()
  }

  inProgressFunc = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failureFunction = () => (
    <div>
      <button type="button" className="retry-buton" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  sucessFunction = () => {
    const {profileobj} = this.state
    const {name, profileImageUrl, shortBio} = profileobj
    return (
      <div className="profilecontainr">
        <img src={profileImageUrl} className="profile-img" alt={name} />
        <h1 className="name-hed">{name}</h1>
        <p className="short-bio">{shortBio}</p>
      </div>
    )
  }

  render() {
    return (
      <div className="profile-container">{this.renderProfileComponent()}</div>
    )
  }
}
export default Profile
