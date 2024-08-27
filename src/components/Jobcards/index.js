import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {RiHandbagLine} from 'react-icons/ri'

import './index.css'

const JobCard = props => {
  const {item} = props

  const {
    companyLogoUrl,
    employmentType,
    rating,
    jobDescription,
    location,
    packagePerAnnum,
    title,
    id,
  } = item

  return (
    <Link to={`/jobs/${id}`} class="textdeco">
      <li className="list-container1">
        <div className="list-div-2">
          <div className="list-container-3">
            <img src={companyLogoUrl} alt="company logo" className="job-logo" />
            <div className="para-con">
              <h1 className="title">{title}</h1>
              <div className="icon-container">
                <FaStar color="#fbbf24" className="icon-style" size={25} />
                <p className="title-rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="bottom-container">
            <div className="icon-container">
              <MdLocationOn color="#f1f5f9" className="icon-style" size={25} />
              <p className="title-rating">{location}</p>
            </div>
            <div className="icon-container">
              <RiHandbagLine color="#f1f5f9" className="icon-style" size={25} />
              <p className="title-rating">{employmentType}</p>
            </div>
            <p className="title-rating1">{packagePerAnnum}</p>
          </div>
          <hr className="horizontal" />
          <h1 className="description">Description</h1>
          <p className="description1">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobCard
