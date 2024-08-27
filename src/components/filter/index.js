import {BsSearch} from 'react-icons/bs'

import Profile from '../profile'

import './index.css'

const Filterjobs = props => {
  const {
    employmentTypesList,
    salaryRangesList,
    inputvalue,
    onChangeEmplopyee,
    onChangeSalary,
    onClickSearch,
    locationList,
    onChangeLocation,
  } = props
  console.log(salaryRangesList)
  console.log(employmentTypesList)

  const changeEmployeefunc = event => {
    onChangeEmplopyee(event.target.value)
  }

  const changeSalaryfunc = event => {
    onChangeSalary(event.target.value)
  }

  const onChangeText = event => {
    const {onChnageSearch} = props
    onChnageSearch(event.target.value)
  }

  const onkeyEnter = evnt => {
    const {onEnterFunction} = props
    if (evnt.key === 'Enter') {
      onEnterFunction()
    }
  }

  const serchTheInput = () => {
    onClickSearch()
  }

  const onLocation = event => {
    onChangeLocation(event.target.value)
  }

  return (
    <div className="filtergroup-con ">
      <div className="serch-container">
        <input
          type="search"
          placeholder="Search"
          value={inputvalue}
          className="input-serch"
          onChange={onChangeText}
          onKeyDown={onkeyEnter}
        />
        <button
          type="button"
          data-testid="searchButton"
          aria-label="search button"
          className="button-style"
          onClick={serchTheInput}
        >
          <BsSearch className="search-icon" size={25} color="white" />
        </button>
      </div>
      <Profile />
      <hr className="separate" />
      <h1 className="typeof-heading">Type of Employment</h1>
      <ul className="ul-filter-container">
        {employmentTypesList.map(each => (
          <li className="check-container" key={each.employmentTypeId}>
            <input
              type="checkbox"
              value={each.employmentTypeId}
              className="check-boxstyle"
              onChange={changeEmployeefunc}
              id={each.employmentTypeId}
            />
            <label htmlFor={each.employmentTypeId} className="label-style">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="separate" />
      <h1 className="typeof-heading">Salary Range</h1>
      <ul className="ul-filter-container">
        {salaryRangesList.map(each => (
          <li className="check-container" key={each.salaryRangeId}>
            <input
              type="radio"
              value={each.salaryRangeId}
              className="check-boxstyle"
              name="salary"
              onChange={changeSalaryfunc}
              id={each.salaryRangeId}
            />
            <label htmlFor={each.salaryRangeId} className="label-style">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
      <hr className="separate" />

      <h1 className="typeof-heading">location</h1>
      <ul className="ul-filter-container">
        {locationList.map(each => (
          <li className="check-container" key={each.loactionId}>
            <input
              type="checkbox"
              value={each.label}
              className="check-boxstyle"
              id={each.loactionId}
              onChange={onLocation}
            />
            <label htmlFor={each.loactionId} className="label-style">
              {each.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}
export default Filterjobs
