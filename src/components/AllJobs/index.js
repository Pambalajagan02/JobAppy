import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'
import Filterjobs from '../filter'

import JobCard from '../Jobcards'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const locationList = [
  {
    label: 'Hyderabad',
    locationId: 'HYDERABAD',
  },
  {
    label: 'Bangalore',
    loactionId: 'BANGLORE',
  },
  {
    label: 'Chennai',
    loactionId: 'CHENNAI',
  },
  {
    label: 'Delhi',
    loactionId: 'DELHI',
  },
  {
    label: 'Mumbai',
    loactionId: 'MUMBAI',
  },
]

const switchstate = {
  intial: 'INTIAL',
  inprogress: 'INPROGRESS',
  failure: 'FAILURE',
  success: 'SUCCESS',
}

class AllJobsComponent extends Component {
  state = {
    appstatus: switchstate.intial,
    jobitems: [],
    emtype: [],
    minpak: 0,
    search: '',
    locations: [],
  }

  componentDidMount() {
    this.getJobsFunction()
  }

  getJobsFunction = async () => {
    const {emtype, minpak, search, locations} = this.state
    this.setState({appstatus: switchstate.inprogress})
    const jwttoken = Cookies.get('jwtToken')
    const options = {
      headers: {
        Authorization: `Bearer ${jwttoken}`,
      },
      method: 'GET',
    }

    const url = `https://apis.ccbp.in/jobs?employment_type=${emtype.join(
      ',',
    )}&minimum_package=${minpak}&search=${search}&loaction=${locations.join(
      ',',
    )}`
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const upadtelistof = data.jobs.map(each => {
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
      this.setState({appstatus: switchstate.success, jobitems: upadtelistof})
    } else {
      this.setState({appstatus: switchstate.failure})
    }
  }

  renderJobSection = () => {
    const {appstatus} = this.state
    switch (appstatus) {
      case switchstate.inprogress:
        return this.inprogressFun()
      case switchstate.failure:
        return this.failureFun()
      case switchstate.success:
        return this.successFun()
      default:
        return null
    }
  }

  onClickRetryApi = () => {
    this.getJobsFunction()
  }

  inprogressFun = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  successFun = () => {
    const {jobitems} = this.state
    const isempty = jobitems.length
    if (isempty >= 1) {
      return (
        <ul className="ulcontainer1">
          {jobitems.map(each => (
            <JobCard item={each} key={each.id} />
          ))}
        </ul>
      )
    }
    return (
      <div className="loader-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
        />
        <h1 className="failurhed">No Jobs Found</h1>
        <p className="para-fail">we could not find any jobs Try other filter</p>
      </div>
    )
  }

  failureFun = () => (
    <div className="loader-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failurhed">Oops! Something Went Wrong</h1>
      <p className="para-fail">we could not find any page in this time</p>
      <button
        type="button"
        className="retry-button"
        onClick={this.onClickRetryApi}
      >
        Retry
      </button>
    </div>
  )

  onChangeEmplopyee = emvalue => {
    this.setState(
      prevState => ({
        emtype: [...prevState.emtype, emvalue],
      }),
      this.getJobsFunction,
    )
  }

  onChangeSalary = salarval => {
    const salary = parseInt(salarval)

    this.setState({minpak: salary}, this.getJobsFunction)
  }

  onChnageSearch = searchval => {
    this.setState({search: searchval})
  }

  onEnterFunction = () => {
    this.getJobsFunction()
  }

  onClickSearch = () => {
    this.getJobsFunction()
  }

  onChangeLocation = place => {
    this.setState(
      prev => ({locations: [...prev.locations, place]}),
      this.getJobsFunction,
    )
  }

  render() {
    return (
      <div>
        <Filterjobs
          employmentTypesList={employmentTypesList}
          salaryRangesList={salaryRangesList}
          locationList={locationList}
          onChangeLocation={this.onChangeLocation}
          onChnageSearch={this.onChnageSearch}
          onChangeEmplopyee={this.onChangeEmplopyee}
          onChangeSalary={this.onChangeSalary}
          onEnterFunction={this.onEnterFunction}
          onClickSearch={this.onClickSearch}
        />
        {this.renderJobSection()}
      </div>
    )
  }
}
export default AllJobsComponent
