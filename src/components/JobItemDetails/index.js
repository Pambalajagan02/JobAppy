import {Component} from 'react'

import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {RiHandbagLine} from 'react-icons/ri'
import SkillCard from '../skillCard'

import Header from '../Header'

import SimilarJobs from '../similarcard'
import './index.css'

const switchitem = {
  intialItem: 'INTIAL',
  inprogressItem: 'INPROGRESS',
  failureItem: 'FAILURE',
  success: 'SUCCESS',
}

class JobItemDetails extends Component {
  state = {switchto: switchitem.intialItem, newjobitem: {}, similaritems: []}

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const ids = id.replace(':', '')
    console.log(ids)
    this.setState({switchto: switchitem.inprogressItem})
    const jwttin = Cookies.get('jwtToken')
    const options = {
      headers: {
        Authorization: `Bearer ${jwttin}`,
      },
      method: 'GET',
    }
    const url = `https://apis.ccbp.in/jobs/${ids}`

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const jobdetails = data.job_details
      const similar = data.similar_jobs
      console.log(similar)

      const updatedobj = {
        companyLogoUrl: jobdetails.company_logo_url,
        companyWebsiteUrl: jobdetails.company_website_url,
        employmentType: jobdetails.employment_type,
        id: jobdetails.id,
        jobDescription: jobdetails.job_description,
        packagePerAnnum: jobdetails.package_per_annum,
        rating: jobdetails.rating,
        title: jobdetails.title,
        location: jobdetails.location,
        description: jobdetails.life_at_company.description,
        imageUrllife: jobdetails.life_at_company.image_url,
        skills: jobdetails.skills.map(each => {
          const newskill = {
            imageUrl: each.image_url,
            name: each.name,
          }
          return newskill
        }),
      }

      const nearray = similar.map(each => {
        const obj = {
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          packagePerAnnum: each.package_per_annum,
          rating: each.rating,
          title: each.title,
        }
        return obj
      })
      this.setState({
        switchto: switchitem.success,
        newjobitem: updatedobj,
        similaritems: nearray,
      })
    } else {
      this.setState({switchto: switchitem.failureItem})
    }
  }

  renderJobItemDetails = () => {
    const {switchto} = this.state
    switch (switchto) {
      case switchitem.inprogressItem:
        return this.renderLoader()
      case switchitem.failureItem:
        return this.renderFailure()
      case switchitem.success:
        return this.renderSuccess()
      default:
        return null
    }
  }

  renderLoader = () => (
    <div className="loader-container-item" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailure = () => (
    <div className="loader-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failurhed">Oops! Something Went Wrong</h1>
      <p className="para-fail">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-button">
        Retry
      </button>
    </div>
  )

  renderSuccess = () => {
    const {newjobitem, similaritems} = this.state
    console.log(similaritems)
    return (
      <>
        <Header />
        <div className="main-con">
          <div className="div-container1">
            <div className="content-div-2">
              <div className="div-container-3">
                <img
                  src={newjobitem.companyLogoUrl}
                  alt="job details company logo"
                  className="website logo"
                />
                <div className="para-con">
                  <h1 className="title">{newjobitem.title}</h1>
                  <div className="icon-container">
                    <FaStar color="#fbbf24" className="icon-style" size={25} />
                    <p className="title-rating">{newjobitem.rating}</p>
                  </div>
                </div>
              </div>
              <div className="bottom-container">
                <div className="icon-container">
                  <MdLocationOn
                    color="#f1f5f9"
                    className="icon-style"
                    size={25}
                  />
                  <p className="title-rating">{newjobitem.location}</p>
                </div>
                <div className="icon-container">
                  <RiHandbagLine
                    color="#f1f5f9"
                    className="icon-style"
                    size={25}
                  />
                  <p className="title-rating">{newjobitem.employmentType}</p>
                </div>
                <p className="title-rating1">{newjobitem.packagePerAnnum}</p>
              </div>
              <hr className="horizontal" />
              <div className="discription-container">
                <h1 className="description">Description</h1>

                <div className="icon-container1 margin-left-con">
                  <a
                    href={newjobitem.companyWebsiteUrl}
                    className="title-rating blue-col"
                    key="company_website_url"
                  >
                    Visit
                  </a>
                  <FaExternalLinkAlt
                    color="#f1f5f9"
                    className="icon-style"
                    size={20}
                  />
                </div>
              </div>
              <p className="description1">{newjobitem.jobDescription}</p>
              <h1 className="description">Skills</h1>
              <ul className="ul-container-item">
                {newjobitem.skills.map(each => (
                  <SkillCard item={each} key={each.name} />
                ))}
              </ul>
              <p className="description">Life at Company</p>
              <div className="life-conatine">
                <p className="description1">{newjobitem.description}</p>
                <img
                  src={newjobitem.imageUrllife}
                  alt="life at company"
                  className="imglife"
                />
              </div>
            </div>
          </div>
          <p className="description">Similar Jobs</p>
          <ul className="ul-container-item">
            {similaritems.map(each => (
              <SimilarJobs eachitem={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  render() {
    return <div className="item-conatiner">{this.renderJobItemDetails()}</div>
  }
}
export default JobItemDetails
