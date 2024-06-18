import {Component} from 'react'

import Header from '../Header'
import AllJobsComponent from '../AllJobs'
import './index.css'

class JobsList extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="job-container-1">
          <AllJobsComponent />
        </div>
      </>
    )
  }
}
export default JobsList
