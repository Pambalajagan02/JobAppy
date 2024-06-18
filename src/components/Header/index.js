import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {MdHome} from 'react-icons/md'
import {FiShoppingBag} from 'react-icons/fi'
import {IoMdLogOut} from 'react-icons/io'
import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwtToken')
    history.replace('/login')
  }
  return (
    <nav className="Header-container1">
      <div className="nav-content">
        <Link to="/">
          <button type="button" className="button-logo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="websitelogo"
            />
          </button>
        </Link>
        <ul className="hader-img-mobile-container">
          <li>
            <Link to="/">
              <button type="button" className="button-logo" aria-label="mdhome">
                <MdHome size={40} color="white" className="icon" />
              </button>
            </Link>
          </li>
          <li>
            <Link to="/jobs">
              <button type="button" className="button-logo" aria-label="bag">
                <FiShoppingBag size={40} color="white" className="icon" />
              </button>
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="button-logo"
              aria-label="logout"
              onClick={onClickLogout}
            >
              <IoMdLogOut size={40} color="white" className="icon" />
            </button>
          </li>
        </ul>
        <ul className="nav-large-view">
          <div className="home-items">
            <Link to="/">
              <button type="button" className="home-name-button">
                Home
              </button>
            </Link>
            <Link to="/jobs">
              <button type="button" className="home-name-button">
                Jobs
              </button>
            </Link>
          </div>
          <button type="button" className="logout-but" onClick={onClickLogout}>
            Logout
          </button>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Header)
