import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {RiHandbagLine} from 'react-icons/ri'

import './index.css'

const SimilarJobs = props => {
  const {eachitem} = props
  return (
    <li className="list-container1">
      <div className="list-div-2">
        <div className="list-container-3">
          <img
            src={eachitem.companyLogoUrl}
            alt="similar job company logo"
            className="job-logo"
          />
          <div className="para-con">
            <h1 className="title">{eachitem.title}</h1>
            <div className="icon-container">
              <FaStar color="#fbbf24" className="icon-style" size={25} />
              <p className="title-rating">{eachitem.rating}</p>
            </div>
          </div>
        </div>
        <div className="bottom-container">
          <div className="icon-container">
            <MdLocationOn color="#f1f5f9" className="icon-style" size={25} />
            <p className="title-rating">{eachitem.location}</p>
          </div>
          <div className="icon-container">
            <RiHandbagLine color="#f1f5f9" className="icon-style" size={25} />
            <p className="title-rating">{eachitem.employmentType}</p>
          </div>
          <p className="title-rating1">{eachitem.packagePerAnnum}</p>
        </div>
        <hr className="horizontal" />
        <h1 className="description">Description</h1>
        <p className="description1">{eachitem.jobDescription}</p>
      </div>
    </li>
  )
}
export default SimilarJobs
