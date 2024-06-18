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
  } = props

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
            />
            <label className="label-style">{each.label}</label>
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
            />
            <label className="label-style">{each.label}</label>
          </li>
        ))}
      </ul>
      <hr className="separate" />
    </div>
  )
}
export default Filterjobs
